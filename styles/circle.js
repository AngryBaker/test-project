document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const group = params.get('group');

    const circleDetail = document.querySelector('.circle-detail');
    circleDetail.innerHTML = `
        <p>ID: ${id}</p>
        <p>Group: ${group}</p>
    `;

    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});