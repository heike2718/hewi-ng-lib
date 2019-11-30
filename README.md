# hewi-ng-lib

common components for my angular apps

## Komponenten

* header: Malt den Header rot. Das ist eine Test-Komponente ohne sinvollen Hintergrund zum Lernen
* messages: Anzeige von Info-, Warning- und Errormessage über einen Message-Service (reactive / subscribe)
* modal: Allgemeine Dialog-Funktionalität
* jwt: Utilities zur Kommunikation mit dem [authprovider](https://github.com/heike2718/auth-app)
* logger: api mit der man client-errors zu einem Server posten kann. This implementation is based on [Logging in Angular Applications](https://www.codemag.com/Article/1711021/Logging-in-Angular-Applications)




## Notizen (chronologisch absteigend)

__3.2.0__ jwt reduced to merely parsing hash from auth-app

__3.1.0__ more convenient console logger

__3.0.0__ upgrade to angular 8

__2.2.4__ logger: LogService, LogPublishers and LogEntry-Model

__2.2.2__ JWTService: Query-Parameter state und nonce vor der redirect url, da bei #-redirect-urls die alles nach # angeschnitten wird.

* HateoasPayload als JSON-Objekt ergänzt
* modal fertig zum Verwenden in Apps
* messages-Komponente fertig zum Verwenden in Apps
* by Angular-CLI generated component and a easy peasy make text to red h1- component just for playing with the tools


## initialize the logging

* implement a [LogPublishersService]( ./projects/hewi-ng-tester/src/app/services/log-publishers.service.ts )
* define an environment variable for the loglevel
* in [app.component.ts](./projects/hewi-ng-tester/src/app/app.component.ts) init the log level and register your LogPublishers. If you have a global error handler then it is best to init logging there.


## Tests

Teste JWT mit folgender URL:
	http://localhost:4200/	#accessToken=75mdGzlDNrWD&expiresAt=1660600&tokenType=Bearer&state=login&idToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0ZDhlZDAzYS01NzVhLTQ0MmUtODlmNC0wZTU0ZTUxZGQwZDgiLCJpc3MiOiJoZWlrZTI3MTgvYXV0aHByb3ZpZGVyIiwibmFtZSI6Ik1heCBNdXN0ZXJtYW5uIiwiZXhwIjoxNTYwNTg1MTIxLCJpYXQiOjE1NjA1ODQ4MjF9.RIYcSMQDG1A7GORQPOd9FvGRyOtcB2Wc5pnNeAxAb1eyHI8DL22baGz6xHnrH66Vl0wqABL4SQOgEDErWznjv66kMBaVF9mo0uMDRz9lns26EG4nRLLwVlvG8IEA4FSWL54553wR-AczYjdYnxJFv3CBIRIqg7uBc7m4gPKca73KZgpgH2PYqgjqPHg2MqEmMrC2Qyx2ksHBdrqMXPgu7qRKqFwifsCNOGs84Hf0-66jUx40E_vtXiU8reVe5aOSyPs1q6Z6aDdSSF1UjUkK1gQGSW21xq3zWin1GAj9kRSWaUkaaZ17wAGc4Shvd08Pky5prY8EhH6xqeM4ukSc-Q

Hinweis: expiresAt ist aus Kompatibilitätsgründen die UNIX-Epoche, also Anzahl der __Sekunden__ seit 01.01.1970. Siehe [epochconverter](https://www.epochconverter.com/)

