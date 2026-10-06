import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../config/env.js";

export const s3 = new S3Client({
    region: env.AWS_REGION,
    endpoint: env.AWS_ENDPOINT_URL,
    forcePathStyle: !!env.AWS_ENDPOINT_URL,
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED"
});
