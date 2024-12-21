import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import Container from '../Components/Container/Container'
const ContactUs = () => {
  return (
   <Container>
     <div className="max-w-5xl mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Address Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Address</h3>
        <p className="text-lg text-gray-600">
          1234 Shopping St, Suite 100, City, State, ZIP Code
        </p>
      </div>
  
      {/* Phone Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Phone</h3>
        <p className="text-lg text-gray-600">
          Call us at: (123) 456-7890
        </p>
      </div>
    </div>
  
    {/* Social Media Section */}
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-black mb-4">Follow Us</h3>
      <div className="flex space-x-6">
        <div className="text-gray-600 hover:text-[#f50963] flex flex-col border p-2 rounded-md items-center justify-center">
          <FaFacebookF className="text-2xl" /> Facebook
        </div>
        <div className="text-gray-600 hover:text-[#f50963] flex flex-col border p-2 rounded-md items-center justify-center">
          <FaTwitter className="text-2xl" /> Twitter
        </div>
        <div className="text-gray-600 hover:text-[#f50963] flex flex-col border p-2 rounded-md items-center justify-center">
          <FaInstagram className="text-2xl" /> Instagram
        </div>
      </div>
    </div>
  
    {/* Operating Hours Section */}
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-black mb-4">Operating Hours</h3>
      <ul className="text-lg text-gray-800">
        <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
        <li>Saturday: 10:00 AM - 4:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </div>
  
    {/* Contact Form Section */}
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your Message"
            rows="6"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#f50963] text-white rounded-md hover:bg-[#dd0055]"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
   </Container>

  )
}

export default ContactUs