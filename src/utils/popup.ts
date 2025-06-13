interface PopupFormData {
  prenom: string;
  nom: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  typeProjet: string;
}

export const initPopupFormHandling = (): void => {
  const isConfirmationPage: boolean = window.location.pathname.includes('remerciements');

  if (!isConfirmationPage) {
    const popupForm = document.getElementById('popup-form') as HTMLFormElement | null;
    if (popupForm) {
      popupForm.addEventListener(
        'submit',
        function (e) {
          const firstname = getValue(popupForm, 'popup-firstname').trim();
          const lastname = getValue(popupForm, 'popup-lastname').trim();
          const city = getValue(popupForm, 'popup-city').trim();

          const errors: string[] = [];

          if (firstname.length < 2) {
            errors.push('Le prénom doit contenir au moins 2 caractères.');
          }

          if (lastname.length < 2) {
            errors.push('Le nom doit contenir au moins 2 caractères.');
          }

          if (city.length < 2) {
            errors.push('La ville doit contenir au moins 2 caractères.');
          }

          if (errors.length > 0) {
            e.preventDefault();
            e.stopImmediatePropagation();
            alert(errors.join('\n'));
            return false;
          }

          const formData: PopupFormData = {
            prenom: firstname,
            nom: lastname,
            codePostal: getValue(popupForm, 'popup-cp'),
            ville: city,
            email: getValue(popupForm, 'popup-email'),
            telephone: getValue(popupForm, 'popup-phone'),
            typeProjet: getValue(popupForm, 'popup-type-projet'),
          };
          if (Object.values(formData).some((value) => value)) {
            localStorage.setItem('popupFormData', JSON.stringify(formData));
          }
        },
        true
      );
    }
  } else {
    const userInfo: HTMLElement | null = document.getElementById('user-info-popup');
    if (userInfo) {
      const storedData: string | null = localStorage.getItem('popupFormData');
      const formData: PopupFormData | null = storedData ? JSON.parse(storedData) : null;
      if (formData) {
        const labels: { [key: string]: string } = {
          prenom: 'Prénom',
          nom: 'Nom',
          codePostal: 'Code postal',
          ville: 'Ville',
          email: 'Email',
          telephone: 'Téléphone',
          typeProjet: 'Type de projet',
        };
        const infoHTML: string = Object.entries(formData)
          .filter(([, value]) => value)
          .map(
            ([key, value]) => `
              <div class="info-row">
                <strong>${labels[key] || key} :</strong> ${value}
              </div>
            `
          )
          .join('');
        userInfo.innerHTML = `
          <div class="user-info-content">
            <h3>Récapitulatif de votre demande</h3>
            ${infoHTML}
          </div>
        `;
        localStorage.removeItem('popupFormData');
      } else {
        userInfo.innerHTML = '';
      }
    }
  }
};

const getValue = (form: HTMLFormElement, id: string): string => {
  const element = form.querySelector(`#${id}`) as HTMLInputElement | HTMLSelectElement | null;
  return element ? element.value : '';
};
