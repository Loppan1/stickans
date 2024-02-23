// Event listener för menyklick
document.getElementById('navMenu').addEventListener('click', function() {
    createMenu();
});

// Skapar menyn
function createMenu() {
    const menuModal = document.createElement('div');
    menuModal.classList.add('menu');
    
    const menuContent = document.createElement('div');
    menuContent.innerHTML = `
        <article class="menu-content">
        <div class="nav-menu nav-position" id="closeButton">
        <div class="exit-line angle-left"></div>
        <div class="exit-line angle-right"></div>
        </div>
        <h2 class="section-heading"><a href="index.html">INDEX</a></h2>
        <h2 class="section-heading"><a href="verktyg.html">VERKTYGSBIBLIOTEK</a></h2>
        <h2 class="section-heading"><a href="dina-verktyg.html">DINA LÅNADE</a></h2>
        <h2 class="section-heading">LOGGA UT</h2>
        </article>
    `;
    
    menuModal.appendChild(menuContent);
    
    document.body.appendChild(menuModal);
    
    let closeButton = menuModal.querySelector('#closeButton');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(menuModal);
    });
}


//Skapar och visar verktygsmodal, behöver göras om ifall databas istället för hårdkodning används för verktygen
document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(toolCard => {
        const button = toolCard.querySelector('button');
        const toolName = toolCard.querySelector('h2').textContent;

        button.addEventListener('click', function() {
            const action = button.textContent;
            const modal = createModal(toolName, action);
            document.body.appendChild(modal);
        });
    });

    function createModal(toolName, action) {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
    
        const modal = document.createElement('section');
        modal.classList.add('modal-content');
    
        const modalHeading = document.createElement('h2');
        modalHeading.classList.add('section-heading', 'modal-heading', 'margin-center');
        modalHeading.textContent = toolName;
    
        const modalText = document.createElement('p');
        modalText.classList.add('body-bold');
        modalText.textContent = action === 'LÅNA' ? 'Lämnas tillbaka senast den 30/2' : '';
    
        const modalButton = document.createElement('button');
        modalButton.classList.add('button-text', 'button-large', action === 'LÅNA' ? 'positive-color' : 'negative-color');
        modalButton.innerHTML = '<a>' + (action === 'LÅNA' ? 'BEKRÄFTA LÅN' : 'UTLÅNAD TOM. 30/2') + '</a>';
    
        modal.appendChild(modalHeading);
        modal.appendChild(modalText);
        modal.appendChild(modalButton);
        
        modalContainer.appendChild(modal);
    
        modalButton.addEventListener('click', function() {
            if (action === 'LÅNA') {
                window.location.href = 'bokning.html';
            } else {
                document.body.removeChild(modalContainer);
            }
        });
    
        window.addEventListener('click', function(event) {
            if (event.target === modalContainer) {
                document.body.removeChild(modalContainer);
            }
        });
    
        return modalContainer;
    }});