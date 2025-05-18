# 📄 README.md – Wtyczka Home Assistant: User Dashboard Guard

Wtyczka **User Dashboard Guard** dla Home Assistant umożliwia administratorom przypisywanie użytkowników do konkretnych dashboardów. Tylko przypisani użytkownicy mają dostęp do wyznaczonych dashboardów, co zwiększa bezpieczeństwo i kontrolę nad dostępem do interfejsu użytkownika.

---

## 🔧 Instalacja

1. **Pobierz pliki wtyczki**:

   * `user_dashboard_admin.js` – panel administracyjny do zarządzania przypisaniami.
   * `user_dashboard_denied.js` – strona informująca o braku dostępu.

2. **Skopiuj pliki do katalogu `www/`**:

   * Umieść oba pliki w katalogu `www/` swojej instalacji Home Assistant.

3. **Zaktualizuj plik `configuration.yaml`**:

   Dodaj poniższą konfigurację do pliku `configuration.yaml`, aby zarejestrować panele w Home Assistant:

   ```yaml
   panel_custom:
     - name: user-dashboard-admin
       sidebar_title: Dashboard Admin
       sidebar_icon: mdi:account-cog
       url_path: user-dashboard-admin
       module_url: /local/user_dashboard/user_dashboard_admin.js
       require_admin: true

     - name: user-dashboard-denied
       sidebar_title: Access Denied
       sidebar_icon: mdi:lock-alert
       url_path: user-dashboard-denied
       module_url: /local/user_dashboard/user_dashboard_denied.js
   ```

   Ustawienie `require_admin: true` zapewnia, że tylko administratorzy mają dostęp do panelu administracyjnego.

4. **Zrestartuj Home Assistant**:

   * Po zapisaniu zmian zrestartuj Home Assistant, aby panele były dostępne w interfejsie użytkownika.

---

## 🛠️ Użycie

* **Panel administracyjny**:

  * Dostępny w menu bocznym pod nazwą „Dashboard Admin”.
  * Umożliwia przypisywanie użytkowników do dashboardów poprzez interfejs graficzny.

* **Strona informująca o braku dostępu**:

  * Jeśli użytkownik nie ma przypisanego dashboardu, zostanie przekierowany na stronę „Access Denied” z odpowiednim komunikatem.

---

## 🔒 Uwagi dotyczące bezpieczeństwa

* Upewnij się, że tylko administratorzy mają dostęp do panelu administracyjnego.
* Rozważ dodanie dodatkowych mechanizmów uwierzytelniania lub autoryzacji, jeśli to konieczne.

---

## 📄 Licencja

Ten projekt jest udostępniany na licencji MIT. Szczegóły znajdują się w pliku `LICENSE`.

---

Dzięki tej wtyczce administratorzy mogą w prosty sposób zarządzać przypisaniami użytkowników do dashboardów, zapewniając lepszą kontrolę dostępu w systemie Home Assistant.
