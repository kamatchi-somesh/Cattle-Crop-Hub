// AboutPage.js
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 py-2">
      {/* Home Page Section */}
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Daily Fresh Cattle Products in{" "}
            <span className="text-blue-600 text-">Your Home</span>
          </h2>
        </div>
      </div>

      {/* About Page Section */}
      <div className="container bg-white mx-auto my-10 p-6 bg-blue-200 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <p className="mb-4">
          We are a group of farmers who joined together to serve the people of our locality by giving an online platform to intimate us by your requirements before the delivery. Through this, you don't need to inform us about the requirement in advance; you can place your requirement here at any time before the delivery day morning 4 AM.
          After 4 AM, we won't process any of your orders as we need to deliver your products.
        </p>

        <p className="mb-4">
          Our mission is to provide high-quality services to our customers. We strive for high-quality food items and quality in basic requirements.
          For that, we provide all-natural products; the crops were grown with natural fertilizers.
        </p>

        <h2 className="text-2xl font-bold my-4">Contact Us</h2>

        <p className="mb-2">
          <strong>Email:</strong> cacoh@gmail.com
        </p>

        <p className="mb-2">
          <strong>Phone:</strong> +91 98980 98980
        </p>

        <p>
          <strong>Address:</strong> Arjun Farmhouse, Pollachi, Coimbatore
        </p>
      </div>
    </div>
  );
};

export default About;
