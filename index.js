/** Функция для создания объекта класса */
function initClass(options, ClassMaker) {
  const items = document.querySelectorAll(options);
  items.forEach((item) => {
    new ClassMaker(item);
  });
};

/** Класс для переключения картинок */
class RoomCarousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.init();
  }

  init() {
    this._createClasses();
    this._createChildren();
    this._setupHandlers();
    this._enable();
  }

  prevImage() {
    this.leftValue += 100;
    switch (this.leftValue) {
      case -100:
        this.secondPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      case -200:
        this.thirdPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      case 100:
        this.leftValue = -300;
        this.forthPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      default:
        this.firstPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
    }
  }

  nextImage() {
    this.leftValue -= 100;
    switch (this.leftValue) {
      case -100:
        this.secondPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      case -200:
        this.thirdPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      case -300:
        this.forthPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
      default:
        this.leftValue = 0;
        this.firstPicRadio.checked = true;
        this.carouselPictures.style.left = `${this.leftValue}%`;
        break;
    }
  }

  _createClasses() {
    this.classBlock = 'carousel';
    this.classRadio = `${this.classBlock}__radio`;
    this.classPictures = `${this.classBlock}__pictures`;
    this.classButtonPrev = `${this.classBlock}__button_prev`;
    this.classButtonNext = `${this.classBlock}__button_next`;
    this.classRadioReal = `${this.classBlock}__radio-real`;
  }

  _createChildren() {
    [this.carouselInputs] = this.carousel.getElementsByClassName(
      `js-${this.classRadio}`
    );
    this.carouselPictures = this.carousel.querySelector(
      `.js-${this.classPictures}`
    );
    this.carouselPictures.style.left = 0;
    this.leftValue = parseInt(this.carouselPictures.style.left, 10);
    this.carouselPrev = this.carousel.querySelector(
      `.js-${this.classButtonPrev}`
    );
    this.carouselNext = this.carousel.querySelector(
      `.js-${this.classButtonNext}`
    );
    this.carouselRow = this.carouselInputs.getElementsByClassName(
      `js-${this.classRadioReal}`
    );
    [
      this.firstPicRadio,
      this.secondPicRadio,
      this.thirdPicRadio,
      this.forthPicRadio,
    ] = this.carouselRow;
    this.firstPicRadio.checked = true;
  }

  _setupHandlers() {
    this.prevImageHandler = this.prevImage.bind(this);
    this.nextImgHandler = this.nextImage.bind(this);
    this.switchImageHandler = this.switchImage.bind(this);
  }

  _enable() {
    if (this.carouselPrev) {
      this.carouselPrev.addEventListener('pointerup', this.prevImageHandler);
    }
    if (this.carouselNext) {
      this.carouselNext.addEventListener('pointerup', this.nextImgHandler);
    }
    this.carouselInputs.addEventListener('pointerup', this.switchImageHandler);
  }

  switchImage(e) {
    switch (e.target.value) {
      case 'picture_2':
        this.leftValue = -100;
        break;
      case 'picture_3':
        this.leftValue = -200;
        break;
      case 'picture_4':
        this.leftValue = -300;
        break;
      default:
        this.leftValue = 0;
        break;
    }
    this.carouselPictures.style.left = `${this.leftValue}%`;
  }
}

/** Класс для пагинации */
class Pagination {
  constructor(item) {
    this.data = {
      totalNum: 6,
      visibleNum: 3,
    };
    this.num = 1;
    this.init(item);
  }

  init(item) {
    this._createClasses();
    this._createContainer(item);
    this._enable();
  }

  _createClasses() {
    this.classContent = 'pagination__content';
    this.classInfo = 'pagination__info';

    const currentMod = 'current';
    this.classItem = 'pagination__item';
    this.arrClassesOfItem = [this.classItem, `js-${this.classItem}`];
    this.arrClassesOfItemCurrent = [
      this.classItem,
      `${this.classItem}_${currentMod}`,
      `js-${this.classItem}_${currentMod}`,
    ];

    const lastMod = 'last';
    const firstMod = 'first';
    const nextMod = 'next';
    const prevMod = 'prev';
    this.classButton = 'pagination__button';
    this.classButtonLast = `${this.classButton} ${this.classButton}_${lastMod} js-${this.classButton}_${lastMod}`;
    this.selectorButtonLast = `.js-${this.classButton}_${lastMod}`;
    this.classButtonFirst = `${this.classButton} ${this.classButton}_${firstMod} js-${this.classButton}_${firstMod}`;
    this.selectorButtonFirst = `.js-${this.classButton}_${firstMod}`;
    this.classButtonNext = `${this.classButton} ${this.classButton}_${nextMod} js-${this.classButton}_${nextMod}`;
    this.selectorButtonNext = `.js-${this.classButton}_${nextMod}`;
    this.classButtonPrev = `${this.classButton} ${this.classButton}_${prevMod} js-${this.classButton}_${prevMod}`;
    this.selectorButtonPrev = `.js-${this.classButton}_${prevMod}`;
  }

  _createContainer(item) {
    this.paginationContainer = item;
    this.pageButtons = document.createElement('div');
    this.pageButtons.classList.add(
      this.classContent,
      `js-${this.classContent}`
    );
    this.paginationInfo = document.createElement('div');
    this.paginationInfo.classList.add(this.classInfo, `js-${this.classInfo}`);
    this.paginationImages = document.querySelector('.js-top-countries__row');
  }

  _enable() {
    this._render();
    this._createChildren();
    this._setupHandlers();
    this._addListeners();
    this._addToContainer();
  }

  _createChildren() {
    this.buttonItems = Array.from(
      this.pageButtons.querySelectorAll(`.js-${this.classItem}`)
    );
    this.buttonFirst = this.pageButtons.querySelector(this.selectorButtonFirst);
    this.buttonLast = this.pageButtons.querySelector(this.selectorButtonLast);
    this.buttonNext =
      this.num < this.data.totalNum
        ? this.pageButtons.querySelector(this.selectorButtonNext)
        : null;
    this.buttonPrev =
      this.num > 3
        ? this.pageButtons.querySelector(this.selectorButtonPrev)
        : null;
  }

  _setupHandlers() {
    this.onButtonClickHandler = this._onButtonClick.bind(this);
    this.onButtonNextClickHandler = this._onButtonNextClick.bind(this);
    this.onButtonPrevClickHandler = this._onButtonPrevClick.bind(this);
    this.onButtonFirstClickHandler = this._onButtonFirstClick.bind(this);
    this.onButtonLastClickHandler = this._onButtonLastClick.bind(this);
  }

  _addListeners() {
    this.buttonItems.forEach((item) => {
      item.addEventListener('pointerup', this.onButtonClickHandler);
    });
    if (this.buttonNext) {
      this.buttonNext.addEventListener('pointerup', this.onButtonNextClickHandler);
    }
    if (this.buttonPrev) {
      this.buttonPrev.addEventListener('pointerup', this.onButtonPrevClickHandler);
    }
    if (this.buttonFirst) {
      this.buttonFirst.addEventListener('pointerup', this.onButtonFirstClickHandler);
    }
    if (this.buttonLast) {
      this.buttonLast.addEventListener('pointerup', this.onButtonLastClickHandler);
    }
  }

  _addToContainer() {
    this.paginationContainer.prepend(this.pageButtons);
    this.paginationContainer.append(this.paginationInfo);
  }

  _render() {
    this.pageButtons.innerHTML = '';
    this.paginationImages.style.left = `${- this.num * 100 + 100}%`;
    this._countMinMax();
    this._makeNumberButtons();
    this._makeNavigationButtons();
    this._makeInfoLine();
  }

  _countMinMax() {
    const halfOfVisible = parseInt(Math.floor(this.data.visibleNum / 2), 10);
    const currNum = parseInt(this.num, 10);
    this.min = currNum - halfOfVisible;
    this.leftDif = this.data.visibleNum - halfOfVisible - 1;
    this.max = currNum + this.leftDif;

    if (this.min < 1) {
      this.min = 1;
      this.max = this.data.visibleNum;
    }

    if (this.max > this.data.totalNum) {
      this.max = this.data.totalNum;
      this.min = this.max - (this.data.visibleNum - 1);
    }
  }

  _makeNumberButtons() {
    const ifNumIsOne = this.num === 1;
    const start = ifNumIsOne ? 1 : this.min;
    const end = ifNumIsOne ? 3 : this.max;
    Array.from({ length: end - start + 1 }, (_, i) => i + start).forEach(
      (i) => {
        this.pageButtons.appendChild(this._addButton(i));
      }
    );
  }

  _addButton(i) {
    const button = document.createElement('button');
    button.innerText = i;
    button.value = i;
    if (i === this.num) {
      button.classList.add(...this.arrClassesOfItemCurrent);
    } else {
      button.classList.add(...this.arrClassesOfItem);
    }
    return button;
  }

  _makeNavigationButtons() {
    if (this.num === 1) this._addRestButton();
    if (this.num <= 3) this._addLastButton();
    if (this.num < this.max) {
      this._addNextButton();
    } else {
      this._addFirstButton();
    }
    if (this.num > 3) this._addPrevButton();
  }

  _addRestButton() {
    this.pageButtons.innerHTML = `${this.pageButtons.innerHTML}<button value = '4' class = 'js-${this.classItem} ${this.classItem}'>...</button>`;
  }

  _addLastButton() {
    this.pageButtons.innerHTML = `${this.pageButtons.innerHTML}<button class = '${this.classButtonLast}'>${this.data.totalNum}</button>`;
  }

  _addPrevButton() {
    this.pageButtons.innerHTML = `
      <button class = '${this.classButtonPrev}'></button>
      ${this.pageButtons.innerHTML}`;
  }

  _addNextButton() {
    this.pageButtons.innerHTML = `
      ${this.pageButtons.innerHTML}
      <button class = '${this.classButtonNext}'></button>`;
  }

  _addFirstButton() {
    this.pageButtons.innerHTML = `
      <button class = '${this.classButtonFirst}'>1</button>
      ${this.pageButtons.innerHTML}`;
  }

  _makeInfoLine() {
    this.paginationInfo.innerHTML = '';
    this.paginationInfo.innerText = `из 100+ вариантов отдыха`;
  }

  _onButtonClick(e) {
    this.num = parseInt(e.target.value, 10);
    this._enable();
  }

  _onButtonNextClick() {
    this.num += 1;
    this._enable();
  }

  _onButtonPrevClick() {
    this.num -= 1;
    this._enable();
  }

  _onButtonFirstClick() {
    this.num = 1;
    this._enable();
  }

  _onButtonLastClick() {
    this.num = this.data.totalNum;
    this._enable();
  }
}

/** создание объектов классов */
initClass('.js-carousel', RoomCarousel);
initClass('.js-pagination', Pagination);


/** Для отправки сообщения */
const btn = document.querySelector('.contacts__button');
const text = document.querySelector('.contacts__textarea');
btn.addEventListener('pointerup', () => {
  sendMessage();
});
function sendMessage() {
  text.value = '';
  alert('Сообщение отправлено!');
}
