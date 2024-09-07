<template>
  <div class="catalog">
    <h1 class="m-b-2">Каталог объявлений</h1>

    <!-- Форма сортировки -->
    <div class="sort-controls">
      <label>
        Сортировать по:
        <select v-model="sortField" @change="fetchItems">
          <option value="price">Цена</option>
          <option value="created_at">Дата создания</option>
        </select>
      </label>

      <label>
        Порядок:
        <select v-model="sortOrder" @change="fetchItems">
          <option value="asc">Возрастание</option>
          <option value="desc">Убывание</option>
        </select>
      </label>
    </div>

    <!-- Список объявлений -->
    <div class="ads-list">
      <div v-for="item in items" :key="item.id" class="ad-item">
        <img :src="item.photos ? item.photos[0] : ''" alt="Фото объявления" class="ad-photo">
        <div class="ad-details">
          <h3>{{ item.title }}</h3>
          <p>Цена: {{ item.price }} ₽</p>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="catalog-button">
        Назад
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="catalog-button">
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useApi } from '../../services/api/api';

export default {
  setup() {
    const items = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const sortField = ref('price');
    const sortOrder = ref('asc');
    const totalItems = ref(0);

    const totalPages = computed(() => {
      return Math.ceil(totalItems.value / itemsPerPage.value);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchItems();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchItems();
      }
    };

    const fetchItems = async () => {
      const api = useApi();
      try {
        const response = await api.fetchAnnouncements({
          page: currentPage.value,
          sortField: sortField.value,
          sortOrder: sortOrder.value,
        });
        items.value = response.data;
        totalItems.value = response.meta.total;
      } catch (error) {
        console.error('Ошибка загрузки объявлений:', error);
      }
    };

    onMounted(fetchItems);

    return {
      items,
      currentPage,
      itemsPerPage,
      sortField,
      sortOrder,
      totalItems,
      totalPages,
      prevPage,
      nextPage,
      fetchItems,
    };
  },
};
</script>

<style scoped>
.catalog {
  max-width: 100%;
  width: 100%;
  margin: 40px auto;
  padding: 20px;
}

.sort-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ads-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.ad-item {
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
}

.ad-photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}

.catalog-button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.catalog-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
