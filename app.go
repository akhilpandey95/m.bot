package main

import (
    //"os"
    "log"
    "fmt"
    "encoding/json"
    "bytes"
    "time"
    "io/ioutil"
    "strings"
    "net/url"
    "net/http"
)

// temporary environment variables
// os.Setenv("api_url", "https://graph.facebook.com/v2.7/me/messages")
// os.Setenv("api_port", 5000)
// os.Setenv("api_vertkn", "sometoken")
// os.Setenv("api_acctkn", "")

var URL = "https://graph.facebook.com/v2.7/me/messages"
var PORT = "5000"
var VTKN = "sometoken"
var ATKN = ""

type Sender struct {
    ID int64 `json: "id"`
}

type Recipient struct {
    ID int64 `json: "id"`
}

type Message struct {
    MID  string `json: "mid"`
    Seq  int64 `json: "seq"`
    Text string `json: "text"`
}

type Messaging struct {
    Sender    Sender `json: "sender"`
    Timestamp int64 `json: timestamp`
    Recipient Recipient `json: "recipient"`
    Message   Message `json: "message"`
}

type Entry struct {
    ID        int64 `json: "id"`
    Timestamp int64 `json: "timestamp"`
    Messaging []Messaging `json: "messaging"`
}

type SendMessage struct {
    Recipient Recipient `json: "recipient"`
    Message   struct { Text string `json: "text"`} `json: "message"`
}

type ReceivedMessage struct {
    Object string `json: "object"`
    Entry  []Entry `json: "entry"`
}

type Buttons struct {
    Type  string `json: "type"`
    Url   string `json: "url"`
    Title string `json: "title"`
}

type Payload struct {
    TemplateType string `json: "template_type"`
    Text string `json: "text"`
    Buttons Buttons `json: "buttons"`
}

type Attachment struct {
    Type string `json: "type"`
    Payload Payload `json: "payload"`
}

type ButtonMessageBody struct {
    Attachment Attachment `json: "attachment"`
}

type ButtonMessage struct {
    Recipient Recipient `json: "recipient"`
    ButtonMessageBody ButtonMessageBody `json: "message"`
}

func homepageHandler(rw http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(rw, "Hello there, this is felix, Cheif Operaional Commandant to Mr Akhil Pandey")
}

func webhookHandler(rw http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        tokenVerification(rw, r)
    }
    if r.Method == "POST" {
        postWebhook(rw, r)
    }
}

func tokenVerification(rw http.ResponseWriter, r *http.Request) {
    if r.URL.Query().Get("hub.verify_token") == VTKN {
        log.Print("Token verified")
        fmt.Fprintf(rw, r.URL.Query().Get("hub.challenge"))
    } else {
        log.Print("Dude there's something fishy going on")
        fmt.Fprintf(rw, "Error with the token")
    }
}

func postWebhook(rw http.ResponseWriter, r *http.Request) {
    var receivedMessage ReceivedMessage
    body, err:= ioutil.ReadAll(r.Body)
    if err != nil {
        log.Print(err)
    }

    if err:= json.Unmarshal(body, &receivedMessage); err != nil {
        log.Print(err)
    }

    messagingEvents := receivedMessage.Entry[0].Messaging
    for _, event:= range messagingEvents {
        senderID:= event.Sender.ID
        if &event.Message != nil && event.Message.Text != "" {
            message:= getReplyMessage(event.Message.Text)
            sendTextMessage(senderID, message)
        }
    }
    fmt.Fprintf(rw, "Success")
}

func getReplyMessage(receivedMessage string) string {
    var message string
    receivedMessage = strings.ToUpper(receivedMessage)
    log.Printf("Felix received: ", receivedMessage)

    if strings.Contains(receivedMessage, "who are you") {
        message =  "I am felix, Cheif Cyber Commandant to Master Akhil"
    } else if receivedMessage == "Hi" {
        message = "Hello there, my name is felix"
    } else {
        message = ":)"
    }
    return message
}

func sendTextMessage(senderID int64, text string) {
    recipient := new(Recipient)
    send_message := new(SendMessage)
    recipient.ID = senderID
    send_message.Recipient = *recipient
    send_message.Message.Text = text
    send_message_body, err:= json.Marshal(send_message)

    if err!= nil {
        log.Print(err)
    }
    req, err:= http.NewRequest("POST", URL, bytes.NewBuffer(send_message_body))

    if err!= nil {
        log.Print(err)
    }

    fmt.Printf("%T", req)
    fmt.Printf("%T", err)

    values:= url.Values{}
    values.Add("access_token", ATKN)
    req.URL.RawQuery = values.Encode()
    req.Header.Add("Content-Type", "application/json: charset = UTF-8")
    client:= &http.Client{Timeout: time.Duration(30 * time.Second)}
    res, err:= client.Do(req)
    if err != nil {
        log.Print(err)
    }
    defer res.Body.Close()
    var result map[string]interface{}
    body, err:= ioutil.ReadAll(res.Body)
    if err != nil {
        log.Print(err)
    }
    if err:= json.Unmarshal(body, &result); err != nil {
        log.Print(err)
    }
    log.Print(result)
}

func main() {
    http.HandleFunc("/", homepageHandler)
    http.HandleFunc("/facebook", webhookHandler)
    http.ListenAndServe(PORT, nil)
}
