class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.filterButton = document.getElementById("filter-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.onSelectedBookingDate = document.getElementById("tanggal");
    this.onSelectedTimeBooking = document.getElementById("jam");
    this.onSelectedTotalPassenger = document.getElementById("jumlah");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
    this.filterButton.onclick = this.onFilteredCar;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  onFilteredCar = async (event) => {
    this.clear();
    const bookingDatesTime =
      this.onSelectedBookingDate.value +
      "T" +
      this.onSelectedTimeBooking.value +
      ":00Z";
    const bookingDates = Date.parse(bookingDatesTime);

    const filteredCar = await Binar.listCars((data) => {
      const dateAvailable = Date.parse(data.availableAt);
      if (
        dateAvailable >= bookingDates &&
        data.capacity >= this.onSelectedTotalPassenger.value
      ) {
        return data.availableAt && data.capacity;
      }
    });
    Car.init(filteredCar);
    this.run();

    event.preventDefault();
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
