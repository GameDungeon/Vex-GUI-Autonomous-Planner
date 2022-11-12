const auton_select = <HTMLInputElement>document.getElementById("auton-select")!

const select: HTMLElement = auton_select.querySelector('.select')!;
const caret: HTMLElement = auton_select.querySelector('.caret')!;
const menu: HTMLElement = auton_select.querySelector('.menu')!;
const options: NodeListOf<HTMLElement> = auton_select.querySelectorAll('.menu li')!;
const selected: HTMLElement = auton_select.querySelector('.selected')!;

auton_select.addEventListener('click', () => {
    select?.classList.toggle('select-clicked');
    caret?.classList.toggle('caret-rotate');
    menu?.classList.toggle('menu-open');
})

options.forEach(option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;

        options.forEach(option => {
            option.classList.remove('active');
        })

        option.classList.add('active');
    })
})