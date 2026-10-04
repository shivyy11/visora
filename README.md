# Visora 

> **See the world through AI-powered vision.**

Visora is a real-time **AI Object Detection** web application built with **Next.js, React, TensorFlow.js, and COCO-SSD**. It uses your device's webcam to detect objects in real time and displays bounding boxes around the detected objects.

The project was built to explore how machine learning models can be integrated directly into modern web applications using **TensorFlow.js**.

---

##  Features

*  Real-time webcam object detection
*  AI-powered detection using COCO-SSD
*  Runs directly in the browser using TensorFlow.js
*  Uses WebGL for faster model processing
*  Detects multiple objects simultaneously
*  Displays bounding boxes around detected objects
*  Shows the detected object's class
*  Responsive interface
*  Built with Next.js
*  No image or video is uploaded to a server for detection

---

##  Tech Stack

### Frontend

* **Next.js**
* **React.js**
* **Tailwind CSS**
* **JavaScript**

### AI / Machine Learning

* **TensorFlow.js**
* **COCO-SSD**
* **WebGL**

### Other Libraries

* **React Webcam**
* **Lodash**

---

##  How It Works

Visora follows a simple real-time detection pipeline:

```text
Webcam
   ↓
React Webcam
   ↓
Video Frame
   ↓
TensorFlow.js
   ↓
COCO-SSD Model
   ↓
Object Detection
   ↓
Bounding Boxes + Labels
   ↓
Canvas Overlay
```

1. The application requests access to the user's webcam.
2. The webcam provides a live video stream.
3. The COCO-SSD model is loaded using TensorFlow.js.
4. Video frames are processed by the model.
5. Detected objects are returned with their class, confidence, and bounding box.
6. Canvas is used to draw the detection results over the webcam feed.

---

## 📂 Project Structure

```text
visora/
│
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   └── object-detection.js
│
├── utils/
│   └── render-prediction.js
│
├── public/
│   └── pols-aagyi-pols.mp3
│
├── package.json
├── package-lock.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

> The exact structure may vary depending on the version of Next.js and the additional files created during development.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js**
* **npm**
* **Git**

You can check your versions using:

```bash
node -v
npm -v
git --version
```

---

##  Installation

Clone the repository:

```bash
git clone https://github.com/shivyy11/visora.git
```

Move into the project directory:

```bash
cd visora
```

Install dependencies:

```bash
npm install
```

---

##  Run Locally

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Allow webcam access when your browser asks for permission.

---

##  Build for Production

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

---

##  Webcam Permissions

Visora requires access to your device's camera.

When opening the application:

1. Open the website.
2. Allow camera permissions.
3. Wait for the AI model to load.
4. Point the camera toward objects.
5. The detected objects will appear with bounding boxes.

For deployed applications, webcam access requires a secure **HTTPS** connection.

---

##  Object Detection

Visora uses the **COCO-SSD** model through TensorFlow.js.

The model can detect common objects such as:

* Person
* Bicycle
* Car
* Motorcycle
* Airplane
* Bus
* Train
* Truck
* Boat
* Cat
* Dog
* Backpack
* Umbrella
* Handbag
* Laptop
* Cell phone
* Book
* Bottle
* Chair
* Cup
* Keyboard
* Mouse
* Monitor
* And many other common objects

Detection results include:

```text
Object Class
Confidence Score
Bounding Box
```

---

##  TensorFlow.js WebGL

Visora uses the TensorFlow.js WebGL backend:

```js
await tf.setBackend("webgl");
await tf.ready();
```

WebGL allows TensorFlow.js to utilize the GPU where supported, which can improve real-time model inference performance in the browser.

---

##  Audio Detection

The application can also trigger an audio response when a **person** is detected.

The audio file is stored inside the `public` directory:

```text
public/
└── pols-aagyi-pols.mp3
```

The application only triggers the audio for the `person` class.

---

##  Deployment

Visora can be deployed easily using **Vercel**.

### Deploy with Vercel

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com).
3. Sign in with GitHub.
4. Import the `visora` repository.
5. Keep the default Next.js settings.
6. Click **Deploy**.

After deployment, Vercel will provide a live URL for the application.

---

##  Privacy

Object detection is performed directly in the browser using TensorFlow.js.

The webcam stream is used for real-time detection and is not required to be uploaded to a backend server.

Users should still review their browser permissions and understand how their specific browser handles camera access.

---

##  Future Improvements

Some possible improvements for Visora include:

* [ ] Display confidence percentage
* [ ] Add object detection history
* [ ] Add screenshot functionality
* [ ] Add video recording
* [ ] Add detection statistics
* [ ] Improve mobile camera support
* [ ] Add selectable detection thresholds
* [ ] Add more TensorFlow.js models
* [ ] Improve detection performance
* [ ] Add dark/light theme
* [ ] Add object-specific audio alerts

---

##  What I Learned

Building Visora helped me understand:

* Next.js application structure
* React components and hooks
* Client-side AI/ML integration
* TensorFlow.js
* COCO-SSD object detection
* WebGL acceleration
* Webcam integration in React
* Canvas rendering
* Real-time prediction handling
* Deploying Next.js applications

---

##  Author

**Shivani Barman**

B.Tech CSE (Data Science)
OIST Bhopal

### Connect with me

* GitHub: [@shivyy11](https://github.com/shivyy11)
* LinkedIn: [Shivani Barman](https://www.linkedin.com/)

---

##  Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is created for learning and educational purposes.
