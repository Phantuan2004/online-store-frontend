<template>
  <!-- Categories -->
  <section class="section-categories padding-b-100">
    <div class="container">
      <div class="row mb-minus-24">
        <div class="col-lg-4 col-12 mb-24">
          <div class="cr-categories">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" v-for="(cat, index) in categoryTabs" :key="cat.target" role="presentation">
                <button
                  class="nav-link center-categories-inner"
                  :class="{ active: index === 0 }"
                  :id="cat.id"
                  data-bs-toggle="tab"
                  :data-bs-target="'#' + cat.target"
                  type="button"
                  role="tab"
                  :aria-controls="cat.target"
                  :aria-selected="index === 0 ? 'true' : 'false'"
                >
                  {{ cat.name }} <span>({{ cat.items }} items)</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <router-link class="center-categories-inner cr-view-more" to="/shop">View More</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-8 col-12 mb-24">
          <div class="tab-content" id="myTabContent">
            <div
              v-for="(cat, index) in categoryTabs"
              :key="cat.target"
              class="tab-pane fade"
              :class="{ 'active show': index === 0 }"
              :id="cat.target"
              role="tabpanel"
              :aria-labelledby="cat.id"
            >
              <div class="row mb-minus-24">
                <div v-for="promo in cat.promos" :key="promo.title" class="col-6 cr-categories-box mb-24">
                  <div class="cr-side-categories">
                    <div class="categories-inner">
                      <h4>{{ promo.off }}
                        <span>
                          <small>%</small>
                          <small>Off</small>
                        </span>
                      </h4>
                    </div>
                    <div class="categories-contain">
                      <div class="categories-text">
                        <h5>{{ promo.title }}</h5>
                      </div>
                      <div class="categories-button">
                        <router-link to="/shop" class="cr-button">shop now</router-link>
                      </div>
                    </div>
                    <img :src="getCategoryImage(promo.img)" :alt="'categories-' + promo.img">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categoryImages = import.meta.glob('../../../assets/user/img/categories/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const getCategoryImage = (filename) => {
  return categoryImages[`../../../assets/user/img/categories/${filename}`] || '';
};

const categoryTabs = [
  {
    id: 'cake_milk-tab',
    target: 'cake_milk',
    name: 'Cake & Milk',
    items: 65,
    promos: [
      { off: 50, title: 'Cake', img: '3.jpg' },
      { off: 40, title: 'Milk', img: '4.jpg' }
    ]
  },
  {
    id: 'meat-tab',
    target: 'meat',
    name: 'Fresh Meat',
    items: 30,
    promos: [
      { off: 35, title: 'Fish Meat', img: '1.jpg' },
      { off: 24, title: 'Fresh Meat', img: '2.jpg' }
    ]
  },
  {
    id: 'Vegetables-tab',
    target: 'Vegetables',
    name: 'Vegetables',
    items: 25,
    promos: [
      { off: 45, title: 'Coriander', img: '5.jpg' },
      { off: 20, title: 'Broccoli', img: '6.jpg' }
    ]
  },
  {
    id: 'Custard-tab',
    target: 'Custard',
    name: 'Apple & Mango',
    items: 45,
    promos: [
      { off: 30, title: 'Apple', img: '7.jpg' },
      { off: 25, title: 'Mango', img: '8.jpg' }
    ]
  },
  {
    id: 'Strawberry-tab',
    target: 'Strawberry',
    name: 'Strawberry',
    items: 68,
    promos: [
      { off: 33, title: 'Strawberry', img: '9.jpg' },
      { off: 15, title: 'Strawberry', img: '10.jpg' }
    ]
  }
];
</script>
