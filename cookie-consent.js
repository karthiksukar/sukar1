/**
 * Cookie Consent Modal Script
 *
 * This script creates a cookie consent modal, adds it to the page, and handles
 * user consent. Consent is stored in localStorage to prevent the modal from
 * reappearing on subsequent visits.
 */
document.addEventListener('DOMContentLoaded', () => {

    // The key used to store the consent information in localStorage.
    const COOKIE_CONSENT_KEY = 'sukar_green_energy_cookie_consent';

    // Check if the user has already given consent.
    // If so, we don't need to do anything.
    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'true') {
        return;
    }

    // --- 1. CREATE MODAL HTML ---
    // Create the overlay that will cover the page.
    const overlay = document.createElement('div');
    overlay.id = 'cookie-consent-overlay';

    // Create the modal container.
    const modal = document.createElement('div');
    modal.id = 'cookie-consent-modal';

    // Set the inner HTML of the modal. This includes the text, links to the
    // privacy and cookie policies, and the action buttons.
    modal.innerHTML = `
        <div class="cookie-consent-content">
            <p class="cookie-consent-text">
                By clicking Accept you are agreeing to the use of all cookies which will
                allow us to provide you with the most relevant experience when visiting or
                re-visiting this website. This means that your personal preferences will be
                remembered when you use this website. You can change your consent or
                choose specific settings by clicking "Cookie Settings". By clicking "Reject
                All" we will not use any non-essential cookies. Essential cookies will still be
                used for the website to function properly. Please see our 
                <a href="cookie-policy.html">cookie policy</a> and 
                <a href="privacy-policy.html">privacy policy</a> for more information about how we process your personal data.
            </p>
            <div class="cookie-consent-actions">
                <button type="button" id="cookie-settings-btn">Cookie Settings</button>
                <button type="button" id="cookie-reject-btn">Reject All</button>
                <button type="button" id="cookie-accept-btn">Accept</button>
            </div>
        </div>
    `;

    // Add the modal to the overlay
    overlay.appendChild(modal);


    // --- 2. CREATE MODAL STYLES ---
    // Create a <style> element to hold the CSS for the modal.
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* The overlay covers the entire screen */
        #cookie-consent-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(10, 25, 49, 0.6); /* Dark semi-transparent background from your site's primary color */
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
        }

        /* The modal window itself */
        #cookie-consent-modal {
            background-color: #FFFFFF;
            color: #333333;
            padding: 25px 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            font-family: 'Lora', 'Georgia', serif;
            border-radius: 8px;
            width: 90%;
            max-width: 550px;
            opacity: 0;
            transform: scale(0.95);
            animation: scaleIn 0.3s 0.1s ease-out forwards;
        }

        /* Animations */
        @keyframes fadeIn {
            to { opacity: 1; }
        }

        @keyframes scaleIn {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Content layout inside the modal */
        .cookie-consent-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* Text paragraph styling */
        .cookie-consent-text {
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
            text-align: left;
        }

        /* Link styling to match your site's theme */
        .cookie-consent-text a {
            color: #2E7D32; /* success color */
            text-decoration: underline;
            transition: color 0.3s;
        }

        .cookie-consent-text a:hover {
            color: #84CC16; /* light-green color */
        }

        /* Container for the buttons */
        .cookie-consent-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap; /* Allow buttons to wrap on small screens */
        }

        /* General button styling */
        .cookie-consent-actions button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
            font-family: 'Lora', 'Georgia', serif;
        }

        /* Specific styles for each button */
        #cookie-accept-btn {
            background-color: #2E7D32; /* success color */
            color: #FFFFFF;
            border: 1px solid #2E7D32;
        }

        #cookie-accept-btn:hover {
            background-color: #1b5e20;
            border-color: #1b5e20;
        }

        #cookie-settings-btn,
        #cookie-reject-btn {
            background-color: transparent;
            color: #333333;
            border: 1px solid #cccccc;
        }

        #cookie-settings-btn:hover,
        #cookie-reject-btn:hover {
            background-color: #f0f0f0;
        }
    `;

    // --- 3. APPEND TO DOCUMENT & ADD EVENT LISTENERS ---
    // Append the styles and the modal HTML to the document.
    document.head.appendChild(styles);
    document.body.appendChild(overlay);

    // Function to handle the acceptance or rejection of cookies.
    const handleConsent = () => {
        // Store the consent in localStorage.
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        // Hide the modal with a fade-out animation.
        overlay.style.transition = 'opacity 0.3s';
        overlay.style.opacity = '0';
        // Remove the modal from the DOM after the animation completes.
        setTimeout(() => {
            overlay.remove();
            styles.remove();
        }, 300);
    };

    // Attach the event listener to the "Accept" and "Reject" buttons.
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const rejectBtn = document.getElementById('cookie-reject-btn');
    
    acceptBtn.addEventListener('click', handleConsent);
    rejectBtn.addEventListener('click', handleConsent);
    
    // Note: The "Cookie Settings" button is included for visual consistency.
    // You can add specific functionality to it later if needed.
});
