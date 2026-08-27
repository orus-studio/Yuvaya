# AWS Lambda Deployment Guide (Yuvaya Backend)

This serverless function handles:

1. **Contact Us Submissions** (Sends emails via SMTP/Resend using `nodemailer`).
2. **Offer Quiz Leads** (Appends responses to your Google Sheet Webhook and sends an email notification).

---

## 🚀 Quick 2-Minute Deployment (AWS Lambda Function URL)

### Step 1: Prepare the Zip File

Inside this `lambda` folder, run:

```bash
npm install
```

Then compress `index.mjs`, `package.json`, and `node_modules` into a `.zip` file (e.g. `function.zip`).

---

### Step 2: Create the Function in AWS Console

1. Open the [AWS Lambda Console](https://console.aws.amazon.com/lambda).
2. Click **Create function**.
3. Set **Function name**: `yuvaya-form-handler`.
4. Set **Runtime**: `Node.js 20.x` (or `Node.js 22.x`).
5. Set **Architecture**: `x86_64` or `arm64`.
6. Under **Advanced settings**:
   - Check **Enable function URL**.
   - Set **Auth type**: `NONE`.
   - Check **Configure cross-origin resource sharing (CORS)**.
   - Allow origins: `*` (or your custom domain `https://yuvaya.in`).
   - Allow methods: `POST`, `OPTIONS`.
   - Allow headers: `content-type`.
7. Click **Create function**.

---

### Step 3: Upload the Zip and Configure Environment Variables

1. Under the **Code** tab, click **Upload from** -> **.zip file** and select `function.zip`.
2. Under the **Configuration** -> **Environment variables** tab, add:
   - `SMTP_HOST`: `smtp.resend.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `resend`
   - `SMTP_PASSWORD`: `your_resend_api_key_here` (your Resend API key)
   - `SMTP_FROM`: `hello@yuvaya.in`
   - `CONTACT_RECEIVER`: `hello@yuvaya.in`
   - `QUIZ_WEBHOOK_URL`: `https://script.google.com/macros/s/AKfycbxkapr87EOZdVFPRrgKLZCRYYK7gBsNaW_3t5k7zcvgX-k2F3-1mNj3nqhX9jmIZfFlRw/exec`

---

### Step 4: Connect to Next.js Frontend

Copy the **Function URL** (e.g., `https://abc123xyz.lambda-url.ap-south-1.on.aws/`) and set it in your frontend `.env`:

```env
NEXT_PUBLIC_LAMBDA_API_URL="https://abc123xyz.lambda-url.ap-south-1.on.aws"
```

Rebuild your frontend (`npm run build`) and upload the `out/` folder to S3.
