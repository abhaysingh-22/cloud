#!/bin/bash
awslocal s3 mb s3://cfp-files
awslocal s3api put-bucket-cors --bucket cfp-files --cors-configuration '{
  "CORSRules": [{
    "AllowedOrigins": ["http://localhost:5173"],
    "AllowedMethods": ["GET","PUT","POST","HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"]
  }]
}'
awslocal sqs create-queue --queue-name cfp-chunks-dlq
awslocal sqs create-queue --queue-name cfp-chunks