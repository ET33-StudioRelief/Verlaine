interface FormData {
  prenom: string;
  nom: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  typeprojet: string;
}

interface FormLabels {
  [key: string]: string;
}

export const initFormHandling = (): void => {
  // Détection de la page de remerciements
  const isConfirmationPage: boolean = window.location.pathname.includes('remerciements');

  if (!isConfirmationPage) {
    // Page du formulaire
    const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll(
      'form[data-form="multistep"]'
    );

    forms.forEach((form: HTMLFormElement) => {
      // Validation sur le bouton "Étape suivante" (première étape)
      const nextBtn = form.querySelector('[data-form="next-btn"]');
      if (nextBtn) {
        nextBtn.addEventListener(
          'click',
          (e) => {
            const prenom = form.querySelector<HTMLInputElement>('#form-prenom');
            const nom = form.querySelector<HTMLInputElement>('#form-nom');
            const cp = form.querySelector<HTMLInputElement>('#form-cp');
            const ville = form.querySelector<HTMLInputElement>('#form-ville');

            if (!prenom || prenom.value.trim().length < 2) {
              alert('Le prénom doit contenir au moins 2 lettres.');
              prenom?.focus();
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
            if (!nom || nom.value.trim().length < 2) {
              alert('Le nom doit contenir au moins 2 lettres.');
              nom?.focus();
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
            if (!cp || !/^[0-9]{5}$/.test(cp.value.trim())) {
              alert('Le code postal doit contenir exactement 5 chiffres.');
              cp?.focus();
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
            if (!ville || ville.value.trim().length < 2) {
              alert('La ville doit contenir au moins 2 lettres.');
              ville?.focus();
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
          },
          true
        );
      }

      // Écouteur sur le bouton de soumission
      const submitButton: HTMLInputElement | null = form.querySelector('input[type="submit"]');
      if (submitButton) {
        submitButton.addEventListener('click', () => {
          collectAndStoreFormData(form);
        });
      }

      // Écouteur sur le formulaire lui-même
      form.addEventListener('submit', () => {
        collectAndStoreFormData(form);
      });
    });
  } else {
    const userInfo: HTMLElement | null = document.getElementById('user-info');
    if (userInfo) {
      const storedData: string | null = localStorage.getItem('formData');
      const formData: FormData | null = storedData ? JSON.parse(storedData) : null;

      if (formData) {
        // Libellés en français
        const labels: FormLabels = {
          prenom: 'Prénom',
          nom: 'Nom',
          codePostal: 'Code postal',
          ville: 'Ville',
          email: 'Email',
          telephone: 'Téléphone',
          typeprojet: 'Type de projet',
        };

        // Générer le HTML pour chaque information disponible
        const infoHTML: string = Object.entries(formData)
          .filter(([, value]) => value)
          .map(
            ([key, value]) => `
                        <div class="info-row">
                            <strong>${labels[key]} :</strong> ${value}
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

        // Nettoyer le localStorage après affichage
        localStorage.removeItem('formData');
      } else {
        userInfo.innerHTML = '';
      }
    }
  }
};

// Fonction pour collecter et stocker les données
const collectAndStoreFormData = (form: HTMLFormElement): void => {
  const formData: FormData = {
    prenom: getValueFromForm(form, 'form-prenom'),
    nom: getValueFromForm(form, 'form-nom'),
    codePostal: getValueFromForm(form, 'form-cp'),
    ville: getValueFromForm(form, 'form-ville'),
    email: getValueFromForm(form, 'form-email'),
    telephone: getValueFromForm(form, 'form-phone'),
    typeprojet: getValueFromForm(form, 'form-type-projet'),
  };

  // Stocker uniquement si au moins un champ est rempli
  if (Object.values(formData).some((value) => value)) {
    localStorage.setItem('formData', JSON.stringify(formData));
  }
};

// Fonction utilitaire pour récupérer la valeur d'un champ dans un formulaire spécifique
const getValueFromForm = (form: HTMLFormElement, id: string): string => {
  const element: HTMLInputElement | null = form.querySelector(`#${id}`);
  return element ? element.value : '';
};
