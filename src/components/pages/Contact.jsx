import { useEffect } from 'react';
import '../css/Contact.css';
import Map from "../pages/Map";
import Swal from 'sweetalert2';

function Contact() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  async function handleSubmit(event) {
  event.preventDefault();

  const scriptURL = import.meta.env.VITE_SHEETS_CONTACT_URL;
  const form = event.target.closest("form"); // ensures we get the <form> element
  const formData = new FormData(form);

  Swal.fire({
    title: 'Submitting...',
    text: 'Please wait while we process your registration',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(scriptURL, { method: 'POST', body: formData });

    if (response.ok) {
      await Swal.fire({
        title: "Thank you!",
        text: "Your registration has been submitted successfully!",
        icon: "success",
        confirmButtonText: 'OK',
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`
        }
      });

      form.reset();
    } else {
      throw new Error('Data not saved to sheet');
    }
  } catch (error) {
    console.error('Error!', error.message);
    Swal.fire({
      title: 'Error!',
      text: 'There was an error submitting your form. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

  return (
    <div className="contact-page">
      {/* Hero Section - Mobile First */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #2c1810, #3d2518)' }}>
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          <p className="lead mb-0">Get in touch with us for any inquiries about our premium food products</p>
        </div>
      </section>

      {/* Contact Content - Mobile Optimized */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-12 col-lg-5">
              <h2 className="mb-4">Get in Touch</h2>
              <p className="text-muted mb-4">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <h4>Address</h4>
                    <p>123 Heritage Street, Tamil Nadu, India - 600001</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                    <p>+91 87654 32109</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>info@sitheefoods.com</p>
                    <p>sales@sitheefoods.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-text">
                    <h4>Business Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form action={import.meta.env.VITE_SHEETS_CONTACT_URL} method='post' name='Sitheefoods'>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="quality-concern">Quality Concern</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <button type="submit" onClick={handleSubmit} className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder" style={{ height: "400px", padding: 0 }}>
            {/* <h2>Our Outlets</h2> */}
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
