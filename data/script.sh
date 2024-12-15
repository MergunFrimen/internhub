#!/usr/bin/bash

curl -X 'GET' 'https://munisun-d71a.restdb.io/rest/job-offers' -H 'accept: application/json' -H 'x-apikey: 5df0aababf46220df655d9df' -Ss | jq > job-postings.json
curl -X 'GET' 'https://munisun-d71a.restdb.io/rest/brno-firmy' -H 'accept: application/json' -H 'x-apikey: 5df0aababf46220df655d9df' -Ss | jq > companies.json

python job-postings-convert.py job-postings.json job-postings.csv
python companies-convert.py companies.json companies.csv