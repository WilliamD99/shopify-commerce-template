import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER,
});

export default mailchimp;
