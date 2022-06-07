# Service POST /oauth/token is broken?
After extensive testing and reading the documentation over and over I still got 401 every time I queried that endpoint.

How to replicate: 
1. Complete flow here: https://api.sandbox.lhv.eu/psd2/oauth/authorize?scope=psd2&response_type=code&client_id=PSDEE-LHVTEST-c1dec9&redirect_uri=https://tppsystem.com/callback
2. Add code from the redirect link to the next curl.
3. curl --location --request POST 'https://api.sandbox.lhv.eu/psd2/oauth/token' \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'client_id=PSDEE-LHVTEST-c1dec9' \
     --data-urlencode 'grant_type=authorization_code' \
     --data-urlencode 'redirect_uri=https://tppsystem.com/callback' \
     --data-urlencode 'code='

![Screenshot 2022-06-07 at 23 58 46](https://user-images.githubusercontent.com/17649698/172482069-338c8412-a82b-4d22-8bc2-bdd41240271e.png)
<img width="775" alt="Screenshot 2022-06-07 at 23 59 05" src="https://user-images.githubusercontent.com/17649698/172482085-7edd6405-8155-46dc-8c1f-5abcb064aaf7.png">


# Setting .env variables 

* Generate the cert here: https://api.sandbox.lhv.eu/psd2/ui/certificate-authority
* Save certificate to: certificate.crt
* Extract the subject: openssl x509 -noout -in certificate.crt -subject
* 2.5.4.97=PSDEE-LHVTEST-..... ==> LHV_CLIENT_ID=PSDEE-LHVTEST-.....

Rename empty.env to .env in lhv-integration-backend

# Starting the application

Make sure you rename empty.env found in lhv-integration-backend/ to .env and fill out all the variables in it.

### How to launch the containers:  
docker-compose up dev   
docker-compose up prod  

## Backend responds at:  
http://localhost:3000/

## Frontend responds at:  
http://localhost:4200/

# montonio-lhv-integration

Write an application in NestJS that uses LHV’s open banking sandbox API to display the user a
list of their accounts in LHV. The front end may be written in any framework.

# Intended flow:

1. The application redirects the user to the bank (LHV) to authenticate the user with OAuth
2. The user is redirected back to our application which completes the OAuth flow
3. Our application presents the user with a list of their account numbers

# About the LHV open banking sandbox API:

* General documentation: https://partners.lhv.ee/en/open-banking/
* Swagger:
https://api.sandbox.lhv.eu/psd2/swagger-ui/index.html?configUrl=/psd2/documentation/a
pi-docs/swagger-config
* LHV Sandbox API base URL: https://api.sandbox.lhv.eu/psd2/v1
* To use the API, you need client certificates. There is a link in the Swagger
documentation to generate those certificates.
* Even though the Swagger documentation states that you can skip OAuth and just use
the token “Bearer Liis-MariMnnik”, don’t skip it and implement OAuth properly.
Some notes
To make requests to the API, you need a client ID, which you can extract from the certificates
you generate.
In the Swagger documentation, you can see endpoints for the Authorisations Service. You don’t
need those endpoints as you will be doing OAuth with the more simple “Redirect method” (not
the “Decoupled method”). The OAuth redirect method is described here:
https://partners.lhv.ee/en/open-banking/#oauth.
The Oauth Token Service (POST /oauth/token) is not detailed in Swagger. Instead, you can find
information on it in the general documentation.
Even though in Swagger you see a lot of endpoints regarding accounts and consents, you can
just use the GET /v1/accounts-list endpoint to get a simple list of the user’s accounts without
any complicated consent flow.
Feel free to deviate from the instructions 😉. If you see a quicker, more convenient, or more
user-friendly way to use LHV’s API, show us!
