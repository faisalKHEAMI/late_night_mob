document.addEventListener('DOMContentLoaded', function() {
    // Selecting required DOM elements
    var story = document.getElementById('Our_story');
    var goal = document.getElementById('Goal');
    var info = document.getElementById('Info');
    var cartb= document.getElementById('Cart');
    var signing = document.getElementById('sigining');
    var storyDiv = document.querySelector('.our_story_text');
    var goalDiv = document.querySelector('.Goal_text');
    var infoDiv = document.querySelector('.info_text');
    var cartDiv = document.querySelector('.cart-section')
    var sigingDiv = document.querySelector('.siging-section');
    var cart = [];

    // Helper function to hide all divs
    function hideAllDivs() {
        storyDiv.style.display = 'none';
        goalDiv.style.display = 'none';
        infoDiv.style.display = 'none';
        cartDiv.style.display = 'none';
    }

    // Click event listeners
    signing.addEventListener('click', function(event) {
        if (sigingDiv.style.display === 'block') {
            sigingDiv.style.display = 'none';
        } else {
            hideAllDivs();
            sigingDiv.style.display = 'block';
        }
        event.target.classList.toggle('expanded');
    });

    story.addEventListener('click', function(event) {
        if (storyDiv.style.display === 'block') {
            storyDiv.style.display = 'none';
        } else {
            hideAllDivs();
            storyDiv.style.display = 'block';
        }
        event.target.classList.toggle('expanded');
    });

    goal.addEventListener('click', function(event) {
        if (goalDiv.style.display === 'block') {
            goalDiv.style.display = 'none';
        } else {
            hideAllDivs();
            goalDiv.style.display = 'block';
        }
        event.target.classList.toggle('expanded');
    });

    info.addEventListener('click', function(event) {
        if (infoDiv.style.display === 'block') {
            infoDiv.style.display = 'none';
        } else {
            hideAllDivs();
            infoDiv.style.display = 'block';
        }
        event.target.classList.toggle('expanded');
    });
    cartb.addEventListener('click', function(event) {
        if (cartDiv.style.display === 'block') {
            cartDiv.style.display = 'none';
        } else {
            hideAllDivs();
            cartDiv.style.display = 'block';
        }
        event.target.classList.toggle('expanded');
    });


    window.addToLocalCart= function(productId,price) {
        cart.push(productId);
        // Update the cart's items list in the DOM
        var cartItemsList = document.getElementById('cart_items');
        var itemElement = document.createElement('li');
        itemElement.textContent = productId + "- $"+price;
        cartItemsList.appendChild(itemElement);
        alert(productId + ' added to cart!');
    }

    function addToServerCart(productId) {
        const guestId = 'sampleGuestId123';
        fetch('/add-to-guest-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                guestId: guestId,
                productNumber: productId
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function showCart() {
        cartItemsList.innerHTML = '';
        cart.forEach(productId => {
            var itemElement = document.createElement('li');
            itemElement.textContent = productId;
            cartItemsList.appendChild(itemElement);
        });
        cartSection.style.transform = "translateX(0)";
    }

    window.hideCart = function() {


        hideAllDivs();
        cartDiv.style.display = 'none';

        if (event && event.target) {

            event.target.classList.toggle('expanded');
        }

}

    // Event listeners for product cards
    document.querySelectorAll('button[onclick^="addToCart"]').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('div').id;
            addToLocalCart(productId);
            addToServerCart(productId);
        });
    });
});
function checkout() {
    const uniqueId = new Date().getTime();
    const orderSummary = cart.join(', ');

    const userName = prompt("Enter your name:");
    const userAddress = prompt("Enter your address:");
    const userPhoneNumber = prompt("Enter your phone number:");

    if(userName && userAddress && userPhoneNumber) {
        const orderData = {
            uniqueId: uniqueId,
            summary: orderSummary,
            name: userName,
            address: userAddress,
            phone: userPhoneNumber
        };

        fetch('/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error placing your order.");
        });
    } else {
        alert("You must provide all required information.");
    }
}
function showSignIn() {
    hideAllDivs();
    document.getElementById('signin-form').style.display = 'block';
}

function hideSignIn() {
    document.getElementById('signin-form').style.display = 'none';
}

function showSignUp() {
    hideAllDivs();
    document.getElementById('signup-form').style.display = 'block';
}

function hideSignUp() {
    document.getElementById('signup-form').style.display = 'none';
}

function signIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
})
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            hideSignIn();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error signing in.");
    });
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;
    const name = document.getElementById('signup-name').value;
    const phone = document.getElementById('signup-phone').value;

    fetch('/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password,
          email,
          name,
          phone
      })
  })


    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            hideSignUp();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error signing up.");
    });
}

function showSignIn() {
    hideSignUp();
    document.getElementById('signin-form').style.display = 'block';
}

function hideSignIn() {
    document.getElementById('signin-form').style.display = 'none';
}

function showSignUp() {
    hideSignIn();
    document.getElementById('signup-form').style.display = 'block';
}

function hideSignUp() {
    document.getElementById('signup-form').style.display = 'none';
}
