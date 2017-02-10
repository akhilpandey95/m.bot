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
var VTKN = ""
var ATKN = ""
var SCRT = ""

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

func main() {
    http.HandleFunc("/", homepageHandler)
    http.HandleFunc("/facebook", webhookHandler)
    http.ListenAndServe(PORT, nil)
}
