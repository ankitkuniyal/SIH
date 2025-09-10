// firebaseAdmin.js
import admin from "firebase-admin";

// Service account merged directly
const serviceAccount = {
  type: "service_account",
  project_id: "krishi-sakhi-6c4e0",
  private_key_id: "62bc699a44aaa6e7cd0149a92447a75248d7c6f6",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClf5bULDI0Ph4/
OeIQaCuCWcTCNbwMdDch5mjQm6qpqsaUbDyuOB6WC//tBAnuNKuxNWS6+DxiX68D
13V0N1gfF7mxAbCRMjKSlO54Ws79spvZmmK6UaIIhFH8X07u5bqe/IL/Q51wLCxf
HJrdD/344F8ALwfRK+z+/wItYxV1U5M6VBVVQ+sI2EsrVQeHFtJyoORi9Djmx2eD
BmagyBaO5hfXNBetZbsL1jL9q+eQzY7X46yNSCY/qEsiQpKYnzEGrQ8Koy9rV1WP
3kP4JuDp2bOwMB75kgImn6oTjiKwO1d4cRBBltaQ8AGpy9qCpuJ8sHAVfCXXdW9r
qH/8U6w5AgMBAAECggEAALxQ8mkVFHHEPUBOHQf0s/Pr/nfLrRVLjqO3pCaILl0U
3EfUFNHC1qR/nJ38eoN5OEsfwzIwROwRwWDqfW8NJFI8+cIjduAnJMsM3+cTbXUN
euM6fINS+fO3A5N1RkJdWOPDCn+fI9NmcEowKNRiqug6AKyBpEnfZOcp3mn6CFcq
Opi6dtKtr7v2AV6+nYlT9xFc67pxK0IjLcmJw5uE4Mtw+3FzJ0Id5AxU7d1r9ITo
qKRxG8QB4m5VJgmkjlDXxHDjDIbT8MY78w9oDdqdAghK/2Fq8spqeB+oVJeBiJM9
bqzdlk6n/OTxmQxB6nEQHg/rlb491PfNnWPBw0w0MwKBgQDQWxCncR5/HpXmBOBd
wQNeK3QCQ6mmMQSbn+vapBD5V4OzqIx9Mdwxee0+OB2WAtEsdmReYRzIDBa5r6/4
6Mgw0X6jyDE9PKkjWh/3w2OMbz3LEHTx6bvLY3K8WgAiIVIiQ06QtlSpUzHdpj2g
pBeuZAWYI7kdRLg9p7OWhVvrBwKBgQDLV7L8Y/oWZRObbxcU6x/BnidbUa4lS/IL
UPDu/W7jSkMJrXCuKTfaGcFt4DoyrBK5x0OWwaSDV39OgfWmHVd/vRZCpWuluR3f
hJy213YHA8q5MOYJdlalBPm72jb6ElFXYVdZKdjmAy+D5oGD3eAAwFAbpUgFUC59
QyWNZ4eevwKBgQDLkV25KwVPz/NG1FbeYvlGZZAnsjIrpNLKtjn62beX1hBgVPpG
S5PGZ0kLNEp7yW7TUS0JJTq4nU8KxwNYXx9Qyy4/GRY6rWzXlHONYEJ/8CPgpciM
nwATXKu6KPjeX83emgJF007uTNF4rLajoA9fHGx209hGJ2EXJCWLl+pRuwKBgCbD
611ueej3EAvb29yjDoTM79fa9IYrulMp9SS6r/8o0yrvI8IwHXO44UVfL/klENTW
Bi6hcAmSDrUa1Yf7pAi4NZwzCRio9+b60x2QafHgaS9xAQngw5fmIO4NJdn60AMG
ja5z6eO/y7kroplPHTtHbn42vko1BQfgWzJgAFzlAoGAXfAFhzVrhVJyNwoDdTCT
5uwvtjrdYa9c7Z0V1m49wJyhG5HODnn0RbzZnUqWb/map5NLS5Jp86Ff1WitfGJP
nQAauP9nuTxzMACe4tZJ+XBBdfMubZXaBMsEUcGmM6Isi77m3X2nDg12fQQ+cUsq
jEH0a0DZp4eiYREDkpE9Qyg=
-----END PRIVATE KEY-----`,
  client_email: "firebase-adminsdk-fbsvc@krishi-sakhi-6c4e0.iam.gserviceaccount.com",
  client_id: "112324121477352686163",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40krishi-sakhi-6c4e0.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;