import express, { json } from 'express';
import process from 'process'; // Add this line to import the process object
const app = express();
const port = process.env.PORT || 3000;
import cors from 'cors';
import nodemailer from 'nodemailer';
import 'dotenv/config'; // Load environment variables from .env file
import fs from 'fs';
import path from 'path';

// Middleware
app.use(cors());

// Middleware
app.use(json());

// Create __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// API route to get an image by filename
app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  var imagePath = path.join(__dirname, 'images', filename);
  imagePath += '.png';

  // Check if image exists and send it
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending image: ", err);
      res.status(404).send('Image not found');
    }
  });
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

import { fileURLToPath } from 'url';

app.get('/ancient/data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'ancient', 'ancient.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  });
});

app.get('/ancient/location', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'ancient', 'location.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  }
)});





app.get('/medieval/data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'medieval', 'medieval.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  });
});

app.get('/medieval/location', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'medieval', 'location.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  }
)});





app.get('/modern/data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'modern', 'modern.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  });
});

app.get('/modern/location', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'modern', 'location.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  }
)});







app.get('/all/data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'all', 'all.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  });
});

app.get('/all/location', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'all', 'location.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error fetching data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing data");
    }
  }
)});



// Route to serve information based on the location
app.get("/:location/info", (req, res) => {
  const location = req.params.location; // This will capture 'Rajgir' from the URL

  // Example: Serve the correct file based on the location
  const filePath = path.join(__dirname, 'data', 'information', `${location.toLowerCase()}.txt`);
  
  // Send the file or error if the file doesn't exist
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending the file:", err);
      res.status(404).send("File not found");
    }
  });
});


const sendMailToUser = async (name, email, message) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Automated Feedback Acknowledgement",
    text: `Dear ${name},

Thank you for reaching out and providing your feedback. We appreciate the time you took to share your thoughts with us.

We want you to know that your feedback is important to us and will be reviewed by our team. We are committed to continuously improving our services and will take your input into consideration.

Please note that this is an automated response, and no further action is required on your part. If you have any urgent concerns or need additional assistance, feel free to contact us directly through our support channels.

Thank you once again for your feedback.

Your feedback is provided below:
${message}

Best regards,
BTP-2`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('User email sent: ' + info.response);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

const sendMailToAdmin = async (name, email, message) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.ADMIN_MAIL,
    subject: `Feedback from ${name}`,
    text: `Name: ${name}
Email: ${email}
Message: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin email sent: ' + info.response);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

// Define routes
app.post('/sendmail', async (req, res) => {
  const { name, email, message } = req.body;
  
  const res1 = await sendMailToUser(name, email, message);
  if (res1 === 200) {
    const res2 = await sendMailToAdmin(name, email, message);
    if (res2 === 200) {
      res.status(200).send('Feedback sent successfully');
    } else {
      res.status(500).send('Error sending email to admin');
    }
  } else {
    res.status(500).send('Error sending email to user');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
