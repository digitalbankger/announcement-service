const baseUrl = 'http://localhost:8080';

// Общая функция для выполнения запросов к API
async function fetchData(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}/api${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }

  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
}

// Получение всех объявлений с параметрами сортировки, пагинации и поиска
export function fetchAnnouncements({ page = 1, sortField = 'price', sortOrder = 'asc' } = {}) {
  const queryParams = new URLSearchParams({
    page,
    sortField,
    sortOrder,
  });
  return fetchData(`/announcements?${queryParams.toString()}`);
}

// Получение одного объявления по ID
export function fetchAnnouncementById(id) {
  return fetchData(`/announcements/${id}`);
}

// Создание нового объявления
export function addAnnouncement(item) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  };
  return fetchData('/announcements', options);
}

export function useApi() {
  return {
    fetchAnnouncements,
    fetchAnnouncementById,
    addAnnouncement,
  };
}
