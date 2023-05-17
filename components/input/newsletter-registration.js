import { useRef, useContext } from "react";
import NotificationContext from '../../store/notification-context';
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const enteredEmailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    // to get the pending notification
    notificationCtx.showNotification({
      title: 'Signing up!',
      message: 'Registering for Newsletter.',
      status: 'pending'
    });
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: enteredEmail}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if(response.ok) {
          return response.data;
        }
        return response.json.then(data => {
          throw new Error(data.message || 'Something went wrong!');
        })
      })
      .then((data) => { // to send a success notification after successfully signing up to newsletter
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for Newsletter.',
          status: 'success'
        });
      }).catch(error => { // to send a notification if the call to signup newsletter fails
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Error in registering Newsletter.',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={enteredEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
