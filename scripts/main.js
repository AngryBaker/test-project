document.addEventListener('DOMContentLoaded', () => {
    const maxCircles = 30;
    const groups = 3;
    const circlesPerGroup = maxCircles / groups;
    let circlesData = generateInitialCircles(groups, circlesPerGroup);
    let currentGroup = 1;

    // Инициализируем кружки
    circlesData.forEach(circle => {
        createCircle(circle);
    });

    // Добавляем и удаляем кружки каждые 5 секунд
    setInterval(() => {
        updateGroupCircles(circlesData, currentGroup, circlesPerGroup);
        currentGroup = (currentGroup % groups) + 1;
    }, 5000);
});



function generateInitialCircles(groups, circlesPerGroup) {
    const circles = [];
    for (let group = 1; group <= groups; group++) {
        for (let i = 0; i < circlesPerGroup; i++) {
            circles.push(generateCircle(group));
        }
    }
    return circles;
}

function generateCircle(group) {
    const left = Math.floor((Math.random() * 90) + 5);
    const top = Math.floor((Math.random() * 90) + 5);
    const id = generateId();
    return {
        id: id,
        group: group,
        left: `${left}%`,
        top: `${top}%`
    };
}

function generateId() {
    return Math.random().toString(36).substring(2);
}

function createCircle(circle) {
    const link = document.createElement('a');
    link.className = `star stars-${circle.group}`;
    link.dataset.id = circle.id;
    link.style.left = circle.left;
    link.style.top = circle.top;
    document.querySelector('.stars-box').appendChild(link);
    const round = link;
    const circleParent = document.querySelector('.stars-box');
    const circleCoords = round.getBoundingClientRect();
    const circleParentCoords = circleParent.getBoundingClientRect();
    const topCoord = Math.round(circleCoords.top - circleParentCoords.top);
    const leftCoord = Math.round(circleCoords.left - circleParentCoords.left);
    link.href = `/star.html?id=${circle.id}&top=${circle.top}&left=${circle.left}&group=${circle.group}&topcord=${topCoord}&leftcord=${leftCoord}`;
}

function updateGroupCircles(circlesData, groupToUpdate, circlesPerGroup) {
    const starsBox = document.querySelector('.stars-box');

    const oldCircles = starsBox.querySelectorAll(`.star.stars-${groupToUpdate}`);
    oldCircles.forEach(circle => {
        circle.remove();
    });

    const newCircles = [];
    for (let i = 0; i < circlesPerGroup; i++) {
        const newCircle = generateCircle(groupToUpdate);
        newCircles.push(newCircle);
        createCircle(newCircle);
    }

    circlesData = circlesData.filter(circle => circle.group !== groupToUpdate);
    circlesData.push(...newCircles);
}

// document.addEventListener('DOMContentLoaded', () => {
//     const circles = document.querySelectorAll('.star');

//     circles.forEach(circle => {
//         circle.addEventListener('click', (event) => {
            

//             const round = event.target;
//             const circleParent = event.target.parentElement;
//             const circleCoords = round.getBoundingClientRect();
//             const circleParentCoords = circleParent.getBoundingClientRect();
//             const topCoord = Math.round(circleCoords.top - circleParentCoords.top);
//             const leftCoord = Math.round(circleCoords.left - circleParentCoords.left);

//             // Переход на страницу `star.html` с передачей параметров
//             // window.location.href = `star.html?id=${id}&top=${parseFloat(top)}&left=${parseFloat(left)}&group=${group}&topcord=${topCoord}&leftcord=${leftCoord}`;
            
//         });
//     });
// });