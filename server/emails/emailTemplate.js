

export function resetPasswordEmailTemplate(firstName, resetUrl) {
  return `
  
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #100101, #B67B0F); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="https://res.cloudinary.com/ds0a0s3k3/image/upload/v1743680957/navlogo2_dxysfh.png" alt="eggys-place Logo" style=""max-width: 50.3px; max-height: 43.92px;" margin-bottom: 20px;border-radius: 10px;">

      <h1 style="color: white; margin: 0; font-size: 28px;">Reset password!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #B67B0F;"><strong>Hello ${firstName},</strong></p>
      <p>Forgot your password?</p>
      <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h1>You have requested for a password reset from eggys-place</h1> <p>Please go to this link to reset password</p> <a href=${resetUrl} clicktracking = off>${resetUrl}</a>

      </div>
      
      <p>If you have any questions or need assistance, our support team is always here to help.</p>
      <p>Best regards,<br>The eggys-place Team</p>
    </div>
  </body>
  </html>
  
  
  `;
}

export function orderCreatedEmailTemplate(order) {
  const {
    recipientInfo,
    deliveryAddress,
    orderItems,
    totalPrice,
    status,
    paymentRef,
    createdAt,
  } = order;

  const itemsHTML = orderItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px 0;">${item.title}</td>
      <td style="padding: 8px 0;">₦${item.price}</td>
      <td style="padding: 8px 0;">${item.duration}</td>
      <td style="padding: 8px 0;">${item.category}</td>
    </tr>
  `
    )
    .join("");

  const orderDate = new Date(createdAt).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Order Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #B67B0F, #F8B769); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://res.cloudinary.com/eguono/image/upload/v1743681223/eggys-place/Frame_1171276702_nyzwsr.png" alt="Eggys-place Logo" style="max-width: 50.3px; max-height: 43.92px; margin-bottom: 20px; border-radius: 10px;" />
      <h1 style="color: white; margin: 0; font-size: 28px;">New Order Created</h1>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #0077B5;"><strong>Customer: ${recipientInfo.fullName}</strong></p>
      <p><strong>Email:</strong> ${recipientInfo.email}</p>
      <p><strong>Phone:</strong> ${recipientInfo.phoneNumber}</p>
      <p><strong>Date:</strong> ${orderDate}</p>
      <p><strong>Payment Ref:</strong> ${paymentRef}</p>
      <p><strong>Status:</strong> ${status}</p>

      <h3 style="margin-top: 30px;">Order Items:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; border-bottom: 1px solid #ddd;">Title</th>
            <th style="text-align: left; border-bottom: 1px solid #ddd;">Price</th>
            <th style="text-align: left; border-bottom: 1px solid #ddd;">Duration</th>
            <th style="text-align: left; border-bottom: 1px solid #ddd;">Category</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <p style="margin-top: 20px; font-size: 16px;"><strong>Total Price:</strong> ₦${totalPrice}</p>
      
      <h3 style="margin-top: 30px;">Delivery Address:</h3>
      <p>
        ${deliveryAddress.address}<br/>
        ${deliveryAddress.city}, ${deliveryAddress.state}
      </p>

      <p style="margin-top: 30px;">Please proceed to process this order. If you have any questions, contact the customer directly or reach out to the Eggys-place team.</p>
      <p>Best regards,<br/>The Eggys-place Team</p>
    </div>
  </body>
  </html>
  `;
}