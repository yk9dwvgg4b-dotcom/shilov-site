(() => {
  const extraFilmography = [
    ["2025", "Следопыт | Любовный треугольник | 18-я серия", "Сергей Петухов", "https://www.kino-teatr.ru/movie/kadr/9/2/187729/pv_1883033.jpg"],
    ["2025", "Первый отдел-5 | Эффект бумеранга | Фильм №1", "Боря Рыжин", "https://www.kino-teatr.ru/movie/kadr/7/4/193347/pv_1823379.jpg"],
    ["2025", "Настоящий-3 | Чистый четверг | 17-я серия", "Гром", "https://www.kino-teatr.ru/movie/kadr/0/5/187650/pv_1698480.jpg"],
    ["2025", "Закон тайги-2 | Невская битва | 21-я серия", "Максим", "https://www.kino-teatr.ru/movie/kadr/4/9/189594/pv_1738478.jpg"],
    ["2025", "Великолепная пятерка-7 | Критическая ошибка | 58-я серия", "Олег", "https://www.kino-teatr.ru/movie/kadr/4/9/185994/pv_1674473.jpg"],
    ["2024", "Десять дней до весны", "агитатор с микрофоном", "https://upload.wikimedia.org/wikipedia/ru/c/c3/10_дней_до_весны_poster.jpg"],
    ["2017", "Цензор", "Коммутатор", "https://avatars.mds.yandex.net/i?id=8880f0b518e57a0baff7b1e145ea9ebe-5086898-images-thumbs&n=13"],
    ["2016", "Шаман. Новая угроза | Пристав | Фильм №5", "друг Антона", "https://files.itv.uz/uploads/content/poster/2024/06/21/185c9e1c9b49b77d38680ac1b7e29db9-q-700x1002.jpeg"],
    ["2015", "Такая работа | Парень с нашего двора | 53-я серия", "участковый", "https://www.timeout.ru/wp-content/uploads/kpposters/837755.jpg"],
    ["2014", "Морские дьяволы. Смерч - 2 | Мальчики | Фильм №13", "эпизод", "https://www.kino-teatr.ru/movie/kadr/8/1/100918/pv_509844.jpg"],
    ["2014", "Ментовские войны-8 | Китайская ничья | Фильм №3", "лейтенант", "https://statichdrezka.ac/i/2025/8/24/f3c0be1219889we92q61q.jpg"],
    ["2013", "Улицы разбитых фонарей-13 | Шанс | 37-я серия", "посетитель клуба", "https://www.film.ru/sites/default/files/styles/thumb_260x400/public/movies/posters/50445044-4614599.jpg"],
    ["2013", "Литейный (8-й сезон) | Пуля для охотника | 5-я серия", "Денис", "https://kino-static.tricolor.ru/media/v2/7e7e29b8-0633-4fa2-a5a5-d3e1c7857cd3"],
    ["2013", "Лекарство против страха", "Коблик — рядовой", "https://www.kino-teatr.ru/movie/poster/100871/70044.jpg"],
    ["2011", "Отрыв", "эпизод", "https://ir.ozone.ru/multimedia/1005261462.jpg"],
    ["2004", "Опера: Хроники убойного отдела | Ищи деньги | Фильм №2", "эпизод", "https://ru-images-s.kinorium.com/movie/1080/346921.jpg?1733926319"],
    ["2003", "Три цвета любви", "эпизод", "https://ir.ozone.ru/s3/multimedia-q/c1000/6022411142.jpg"],
    ["1989–2023", "Симпсоны | The Simpsons (США, анимационный)", "озвучивание", "https://m.media-amazon.com/images/M/MV5BNTlmZTQyOTUtZWI5ZC00NzJjLTg2NjEtYzgxMDI1YWYzMDk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"]
  ];

  function filmCard([year, title, role, image]) {
    const article = document.createElement("article");
    article.className = "card-theatre flex h-full gap-3 p-3 sm:gap-4 sm:p-4";

    const media = document.createElement("div");
    media.className = "card-media-frame relative h-[88px] w-[62px] shrink-0 sm:h-[104px] sm:w-[74px]";
    const img = document.createElement("img");
    img.src = image;
    img.alt = title.split("|")[0].trim();
    img.loading = "lazy";
    img.className = "card-media-image object-top";
    media.append(img);

    const body = document.createElement("div");
    body.className = "flex min-w-0 flex-1 flex-col justify-between gap-2";
    const top = document.createElement("div");
    top.className = "flex items-start justify-between gap-3";
    const titleBox = document.createElement("div");
    titleBox.className = "filmography-title min-w-0 flex-1 break-words";
    title.split("|").map(part => part.trim()).forEach((part, index) => {
      const span = document.createElement("span");
      span.className = index === 0 ? "filmography-show block" : "filmography-episode block";
      span.textContent = part;
      titleBox.append(span);
    });
    const yearNode = document.createElement("span");
    yearNode.className = "shrink-0 font-nav text-[10px] tracking-[0.12em] text-gold sm:text-xs";
    yearNode.textContent = year;
    top.append(titleBox, yearNode);
    const roleNode = document.createElement("p");
    roleNode.className = "filmography-role mt-2 break-words";
    roleNode.textContent = role;
    body.append(top, roleNode);
    article.append(media, body);
    return article;
  }

  function restoreFilmography() {
    const section = document.querySelector("#home-filmography");
    if (!section) return;
    const button = [...section.querySelectorAll("button")].find(node => node.textContent.includes("Посмотреть все"));
    if (!button) return;
    const holder = document.createElement("div");
    holder.className = "static-filmography-grid";
    holder.dataset.fullFilmography = "true";
    extraFilmography.forEach(entry => holder.append(filmCard(entry)));
    button.parentElement.before(holder);
    button.setAttribute("aria-expanded", "true");
    button.firstChild.textContent = "Свернуть";
    const count = button.querySelector("span");
    if (count) count.remove();
    button.addEventListener("click", () => {
      const hidden = holder.hidden;
      holder.hidden = !hidden;
      button.setAttribute("aria-expanded", String(hidden));
      button.firstChild.textContent = hidden ? "Свернуть" : "Посмотреть все";
    });
  }

  function expandProjectSections() {
    document.querySelectorAll('button[aria-controls^="home-projects-"]').forEach(button => {
      const content = document.getElementById(button.getAttribute("aria-controls"));
      if (!content) return;
      content.classList.add("static-expanded-projects");
      button.setAttribute("aria-expanded", "true");
      const label = button.querySelector("span span");
      if (label) label.textContent = "Свернуть";
      button.addEventListener("click", () => {
        const open = content.classList.toggle("static-expanded-projects");
        button.setAttribute("aria-expanded", String(open));
        if (label) label.textContent = open ? "Свернуть" : "Развернуть";
      });
    });
  }

  function restoreMobileMenu() {
    const button = document.querySelector('button[aria-controls="layout-mobile-menu"]');
    const header = document.querySelector("#layout-header");
    if (!button || !header) return;
    button.addEventListener("click", () => {
      const current = document.querySelector("#layout-mobile-menu");
      if (current) {
        current.remove();
        button.setAttribute("aria-expanded", "false");
        return;
      }
      const menu = document.createElement("div");
      menu.id = "layout-mobile-menu";
      menu.className = "static-mobile-menu";
      menu.innerHTML = '<nav aria-label="Мобильная навигация"><a href="#home-hero">Главная</a><a href="#home-projects-director">Режиссёр</a><a href="#home-filmography">Актёр</a><a href="#home-highlights">Достижения</a><a href="#layout-footer-contacts">Контакты</a></nav>';
      header.append(menu);
      button.setAttribute("aria-expanded", "true");
      menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.remove()));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    expandProjectSections();
    restoreFilmography();
    restoreMobileMenu();
  });
})();
