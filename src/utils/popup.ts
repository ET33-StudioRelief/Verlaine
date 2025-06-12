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
      popupForm.addEventListener('submit', () => {
        const formData: PopupFormData = {
          prenom: getValue(popupForm, 'popup-firstname'),
          nom: getValue(popupForm, 'popup-lastname'),
          codePostal: getValue(popupForm, 'popup-cp'),
          ville: getValue(popupForm, 'popup-city'),
          email: getValue(popupForm, 'popup-email'),
          telephone: getValue(popupForm, 'popup-phone'),
          typeProjet: getValue(popupForm, 'popup-type-projet'),
        };
        if (Object.values(formData).some((value) => value)) {
          localStorage.setItem('popupFormData', JSON.stringify(formData));
        }
      });
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
