<template>
  <div class="cr-paking-delivery">
    <!-- Tabs Navigation -->
    <ul class="nav nav-tabs" id="productTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'description' }"
          @click="switchTab('description')"
          role="tab"
        >
          Description
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'information' }"
          @click="switchTab('information')"
          role="tab"
        >
          Information
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'reviews' }"
          @click="switchTab('reviews')"
          role="tab"
        >
          Reviews
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content" id="productTabContent">
      <!-- Description Tab -->
      <div v-show="activeTab === 'description'" class="tab-pane fade show active">
        <div class="cr-tab-content">
          <div class="cr-description">
            <p>{{ productDescription }}</p>
          </div>
          <h4 class="heading">Packaging & Delivery</h4>
          <div class="cr-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero
              perferendis dolor! Quis vel consequuntur repellat distinctio rem. Corrupti
              ratione alias odio, error dolore temporibus consequatur, nobis veniam odit
              laborum dignissimos consectetur quae vero in perferendis provident quis.
            </p>
          </div>
        </div>
      </div>

      <!-- Information Tab -->
      <div v-show="activeTab === 'information'" class="tab-pane fade">
        <div class="cr-tab-content">
          <div class="cr-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero
              sapiente doloribus debitis corporis, eaque dicta, repellat amet, illum
              adipisci vel perferendis dolor!
            </p>
          </div>
          <div class="list">
            <ul>
              <li v-for="(value, key) in specs" :key="key">
                <label>{{ key }}<span>:</span></label>{{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-show="activeTab === 'reviews'" class="tab-pane fade">
        <div class="cr-tab-content-from">
          <!-- Existing Reviews -->
          <div v-if="reviews.length > 0" class="post">
            <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="content">
                <img :src="review.image" :alt="review.author" />
                <div class="details">
                  <span class="date">{{ review.date }}</span>
                  <span class="name">{{ review.author }}</span>
                </div>
                <div class="cr-t-review-rating">
                  <i
                    v-for="i in 5"
                    :key="i"
                    :class="
                      i <= review.rating ? 'ri-star-s-fill' : 'ri-star-s-line'
                    "
                  ></i>
                </div>
              </div>
              <p>{{ review.comment }}</p>
            </div>
          </div>

          <!-- Review Form -->
          <h4 class="heading">Add a Review</h4>
          <form @submit.prevent="submitReview" class="review-form">
            <!-- Rating Selection -->
            <div class="cr-ratting-star">
              <span>Your rating :</span>
              <div class="cr-t-review-rating">
                <i
                  v-for="i in 5"
                  :key="i"
                  :class="
                    i <= newReview.rating ? 'ri-star-s-fill' : 'ri-star-s-line'
                  "
                  @click="setRating(i)"
                  style="cursor: pointer"
                  title="Click to rate"
                ></i>
              </div>
            </div>

            <!-- Name Input -->
            <div class="cr-ratting-input">
              <input
                v-model="newReview.name"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <!-- Email Input -->
            <div class="cr-ratting-input">
              <input
                v-model="newReview.email"
                type="email"
                placeholder="Email*"
                required
              />
            </div>

            <!-- Comment Input -->
            <div class="cr-ratting-input form-submit">
              <textarea
                v-model="newReview.comment"
                placeholder="Enter Your Comment"
                rows="5"
                required
              ></textarea>
              <button
                type="submit"
                class="cr-button"
                :disabled="isLoading"
              >
                {{ isLoading ? "Submitting..." : "Submit" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductReviews",
  props: {
    activeTab: {
      type: String,
      default: "description"
    },
    productDescription: {
      type: String,
      default: "Product description goes here..."
    },
    specs: {
      type: Object,
      default: () => ({})
    },
    reviews: {
      type: Array,
      default: () => []
    },
    newReview: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Switch active tab
     */
    switchTab(tabName) {
      this.$emit("tab-changed", tabName);
    },

    /**
     * Set review rating
     */
    setRating(rating) {
      const review = { ...this.newReview, rating };
      this.$emit("update:newReview", review);
    },

    /**
     * Submit review form
     */
    submitReview() {
      this.$emit("review-submitted", this.newReview);
    }
  }
};
</script>

<style scoped>
/* Using existing CSS classes from assets/user/css/style.css */
</style>
