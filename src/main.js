function showData(results) {
  return `<div>
  class="card" style="width: 18rem;">
              <img class="card-img-top" src="${results.picture.medium}" alt="image">
              <div class="cartas card-body">
                 <h4 class="name">${results.name.title} ${results.name.first} ${results.name.last}</h4>
                   <p class="gender">Género: ${results.gender}</p>
                   <p class="age">Edad: ${results.dob.age}</p>
                   <div class="card-text">
                   <p class="phone">Teléfono: ${results.cell}</p>
                   <p class="email">Email: ${results.email}</p>
                   <p class="location">País: ${results.location.country}, ${results.location.city}</p>
                </div>
                </div>
          </div>`;
}
let data = undefined;
const showApi = async (gender = undefined) => {
  if (!data) {
    fetch(`https://randomuser.me/api/?results=20`)
      .then((res) => res.json())
      .then((json) => {
        data = json;
        buildList(gender);
      })

      .catch((err) => {
        console.error(err);
      });
  } else {
    buildList(gender);
  }
};

const buildList = (gender) => {
  const containerGender = document.getElementById('container');
  containerGender.innerHTML = '';
  const res = data.results
    .filter((r) => !gender || r.gender == gender)
    .reduce((r, c) => r + showData(c), '');
  containerGender.innerHTML = res;
};

const btnChooseGenderMale = document.getElementById('btn-male');
btnChooseGenderMale.addEventListener('click', () => {
  showApi('male');
});

const btnChooseGenderFemale = document.getElementById('btn-female');
btnChooseGenderFemale.addEventListener('click', () => {
  showApi('female');
});
