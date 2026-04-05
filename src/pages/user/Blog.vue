<template>
    <!-- Blog Classic -->
    <section class="section-blog-Classic padding-tb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-12 md-30">
                    <div class="cr-blog-sideview" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-serch-box">
                            <form class="cr-search">
                                <input class="search-input" type="text" placeholder="Search here...">
                                <a href="javascript:void(0)" class="search-btn">
                                    <i class="ri-search-line"></i>
                                </a>
                            </form>
                        </div>
                        <div class="cr-blog-categories">
                            <div class="blog-heading">
                                <h4>Category</h4>
                            </div>
                            <div class="cr-blog-categories-content">
                                <ul>
                                    <li>Milks & Dairies <span>( 12 )</span></li>
                                    <li>Sea Food <span>( 09 )</span></li>
                                    <li>Fresh Fruit <span>( 65 )</span></li>
                                    <li>Pet Food <span>( 45 )</span></li>
                                    <li>Meat Food <span>( 34 )</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="cr-blog-recent">
                            <div class="blog-heading">
                                <h4>Recent Post</h4>
                            </div>
                            <div class="cr-blog-recent-post">
                                <div class="cr-blog-recent-image">
                                    <img :src="blogImg1" alt="blog-1">
                                </div>
                                <div class="cr-blog-recent-content">
                                    <span>Sep 09, 2024</span>
                                    <h4>10 Tasty Organic Fruit choose</h4>
                                    <p>Lorem ipsum dolor consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                        <div class="cr-blog-gallery">
                            <div class="blog-heading">
                                <h4>Latest Gallery</h4>
                            </div>
                            <div class="cr-blog-instagram-image">
                                <div class="cr-blog-instagram-image-inner">
                                    <a href="#">
                                        <img :src="instaImg1" alt="1">
                                    </a>
                                    <a href="#">
                                        <img :src="instaImg2" alt="2">
                                    </a>
                                    <a href="#">
                                        <img :src="instaImg3" alt="3">
                                    </a>
                                    <a href="#">
                                        <img :src="instaImg4" alt="4">
                                    </a>
                                    <a href="#">
                                        <img :src="instaImg5" alt="5">
                                    </a>
                                    <a href="#">
                                        <img :src="instaImg6" alt="6">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="cr-blog-tags">
                            <div class="blog-heading">
                                <h4>Popular Tags</h4>
                            </div>
                            <div class="cr-blog-tags-inner">
                                <ul class="cr-tags">
                                    <li><a href="javascript:void(0)">Vegetables</a></li>
                                    <li><a href="javascript:void(0)">juice</a></li>
                                    <li><a href="javascript:void(0)">Meat Food</a></li>
                                    <li><a href="javascript:void(0)">Cabbage</a></li>
                                    <li><a href="javascript:void(0)">Organic food</a></li>
                                    <li><a href="javascript:void(0)">juice</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-12 md-30">
                    <div class="cr-blog-classic" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-blog-classic-content">
                            <div class="cr-comment">
                                <span>By Admin <code> / 07 commen</code></span>
                            </div>
                            <h4>Best guide to Shopping for Organic ingredients.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste alias odit cupiditate harum
                                magnam tenetur inventore dicta voluptatum perferendis voluptate!</p>
                            <a href="javascript:void(0)">read more</a>
                        </div>
                        <div class="cr-blog-image">
                            <img :src="blog1" alt="blog-1">
                        </div>
                    </div>
                    <div class="cr-blog-classic" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-blog-classic-content">
                            <div class="cr-comment">
                                <span>By Admin <code> / 07 commen</code></span>
                            </div>
                            <h4>Best guide to Shopping for Organic ingredients.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste alias odit cupiditate harum
                                magnam tenetur inventore dicta voluptatum perferendis voluptate!</p>
                            <a href="javascript:void(0)">read more</a>
                        </div>
                        <div class="cr-blog-image">
                            <img :src="blog2" alt="blog-2">
                        </div>
                    </div>
                    <div class="cr-blog-classic" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
                        <div class="cr-blog-classic-content">
                            <div class="cr-comment">
                                <span>By Admin <code> / 07 commen</code></span>
                            </div>
                            <h4>Best guide to Shopping for Organic ingredients.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste alias odit cupiditate harum
                                magnam tenetur inventore dicta voluptatum perferendis voluptate!</p>
                            <a href="javascript:void(0)">read more</a>
                        </div>
                        <div class="cr-blog-image">
                            <img :src="blog3" alt="blog-3">
                        </div>
                    </div>

                    <nav aria-label="Blog pagination" class="cr-pagination cr-pagination-custom">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                            </li>
                            <li
                                v-for="page in totalPages"
                                :key="page"
                                class="page-item"
                                :class="{ active: currentPage === page }"
                                :aria-current="currentPage === page ? 'page' : undefined"
                            >
                                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import blogImg1 from '@/assets/user/img/blog/1.jpg';
import blog1 from '@/assets/user/img/blog/blog-1.jpg';
import blog2 from '@/assets/user/img/blog/blog-2.jpg';
import blog3 from '@/assets/user/img/blog/blog-3.jpg';
import instaImg1 from '@/assets/user/img/insta/1.jpg';
import instaImg2 from '@/assets/user/img/insta/2.jpg';
import instaImg3 from '@/assets/user/img/insta/3.jpg';
import instaImg4 from '@/assets/user/img/insta/4.jpg';
import instaImg5 from '@/assets/user/img/insta/5.jpg';
import instaImg6 from '@/assets/user/img/insta/6.jpg';

export default {
    name: 'Blog',
    data() {
        return {
            blogImg1, blog1, blog2, blog3,
            instaImg1, instaImg2, instaImg3, instaImg4, instaImg5, instaImg6,
            currentPage: 1,
            // Tổng số bài blog — sẽ lấy từ API sau, hiện để mock = 3 trang
            totalItems: 9,
            pageSize: 3,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.pageSize);
        }
    },
    methods: {
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            // Khi kết nối API: gọi fetchBlogs(this.currentPage) tại đây
        }
    }
};
</script>

<style scoped>
/* ===== PAGINATION ===== */
.cr-pagination-custom .pagination {
    gap: 4px;
    justify-content: center;
    margin: 0;
}

.cr-pagination-custom .page-link {
    font-size: 13px;
    padding: 5px 11px;
    border-radius: 6px !important;
    border-color: #eee;
    color: #555;
    transition: all 0.2s;
}

.cr-pagination-custom .page-link:hover {
    background-color: #f5f5f5;
    border-color: #ddd;
    color: #333;
}

.cr-pagination-custom .page-item.active .page-link {
    background-color: #64b496;
    border-color: #64b496;
    color: #fff;
}

.cr-pagination-custom .page-item.disabled .page-link {
    color: #ccc;
    border-color: #eee;
    background-color: #fafafa;
}
</style>
