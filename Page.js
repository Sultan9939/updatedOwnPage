document.querySelector('.button-img')
      .addEventListener('click', () => {
        document.querySelector('.menu-content').classList.toggle('show');
      });

      window.addEventListener('click', (event) => {
        if (!event.target.matches('.button-img')) {
          let menus = document.querySelectorAll('.menu-content');
          menus.forEach((openContent) => {
            if (openContent.classList.contains('show')) {
              openContent.classList.remove('show');
            }
          });
        }
      });