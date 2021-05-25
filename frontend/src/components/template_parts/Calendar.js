import React, { useState } from "react";
import SimpleReactCalendar from "simple-react-calendar";

const Calendar = (props) => {
  let location = props.location;

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [days, setDays] = useState(getDaysDifference(start, end));
  const [price, setPrice] = useState(location.price);
  let disabledIntervals = [
    // { start: new Date("2020-10-10"), end: new Date("2020-10-14") },
  ];

  let slots = props.slots;
  console.log(slots);

  let today = new Date();

  for (let i = 0; i < slots.length; i++) {
    let slot = {
      start: convertToDate(slots[i].dateDebut),
      end: convertToDate(slots[i].dateFin),
    };
    disabledIntervals.push(slot);
  }
  disabledIntervals.push({
    start: new Date(today.getFullYear(), today.getMonth() - 1, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
  });

  const onNextStep = (e) => {
    let data = {
      startDate: start,
      endDate: end,
      total: price * days,
      totalDays: days,
    };

    props.nextStep(data);
  };
  const onSelect = (obj) => {
    let diff = getDaysDifference(obj.start, obj.end);
    setDays(diff);
    setStart(obj.start);
    setEnd(obj.end);
  };

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8 col-12">
          <SimpleReactCalendar
            mode="range"
            disabledIntervals={disabledIntervals}
            activeMonth={new Date()}
            onSelect={onSelect}
            daysOfWeek={daysOfWeek}
            headerPrevArrow={<i className="fas fa-chevron-left"></i>}
            headerNextArrow={<i className="fas fa-chevron-right"></i>}
            rangeLimit={7}
            selected={{ start, end }}
          />
        </div>
        <div className="col-md-4 col-12">
          <li className="list-group-item text-center text-info font-weight-bold">
            {location.name}
          </li>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-around">
              <i className="far fa-calendar-alt text-info mr-1"></i> Date
              d'arrivé:{" "}
              <div className="text-info font-weight-bold">
                {start.toLocaleDateString()}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-around">
              <i className="far fa-calendar-alt text-info mr-1"></i> Date de
              départ:{" "}
              <div className="text-info font-weight-bold">
                {end.toLocaleDateString()}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-around">
              Nombre de jours:{" "}
              <div className="text-info font-weight-bold">{days}</div>
            </li>
            <li className="list-group-item d-flex justify-content-around">
              Price à l'unité:{" "}
              <div className="text-info font-weight-bold">
                {price} <i className="fas fa-euro-sign"></i>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-around">
              Prix total:{" "}
              <div className="text-info font-weight-bold">
                {price * days} <i className="fas fa-euro-sign"></i>
              </div>
            </li>

            <li className="list-group-item">
              <button
                style={{ borderRadius: "15px" }}
                className="btn btn-block btn-info"
                onClick={onNextStep}
              >
                Etape suivante
                <i className="fas fa-arrow-right ml-4"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

function getDaysDifference(d1, d2) {
  let numDays = 0;
  let month1 = d1.getMonth();
  let month2 = d2.getMonth();

  if (month1 != month2) {
    let tmp = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
    numDays = parseInt(tmp.getDate() - d1.getDate()) + 1;

    numDays += d2.getDate();
  } else {
    numDays = parseInt(d2.getDate() - d1.getDate()) + 1;
  }

  return numDays;
}

function convertToDate(stringDate) {
  let index = stringDate.indexOf("T");
  let strDate = stringDate.substring(0, index);
  return new Date(strDate);
}

export default Calendar;
