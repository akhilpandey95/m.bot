package main

import (
    "os"
    "log"
    "fmt"
    "net/url"
    "net/http"
)

const URL string = os.Getenv("api_url")
const PORT string = os.Getenv("api_port")
const VTKN string = os.Getenv("api_vertkn")
const ATKN string = os.Getenv("api_acctkn")

func homepageHandler(rw http.ResponseWriter, r *http.Request) {
    fmt.Printf(rw, "Hello there, this is felix, Cheif Operaional Commandant to Mr Akhil Pandey")
}

func webhookHandler(rw http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        tokenVerification(rw, r)
    }
    if r.Method == "POST" {
        postWebhook(rw, r)
    }
}

func main() {
    http.HandleFunc("/", homepageHandler)
    http.HandleFunc("/facebook", webhookHandler)
    http.ListenAndServe(PORT, nil)
}
