<template>
    <!-- Header -->
		<header class="cr-header">
			<div class="container-fluid">
				<div class="cr-header-items">
					<div class="left-header">
						<a href="javascript:void(0)" class="cr-toggle-sidebar">
							<span class="outer-ring">
								<span class="inner-ring"></span>
							</span>
						</a>
						<div class="header-search-box">
							<div class="header-search-drop">
								<a href="javascript:void(0)" class="open-search"><i class="ri-search-line"></i></a>
								<form class="cr-search">
									<input class="search-input" type="text" placeholder="Search...">
									<a href="javascript:void(0)" class="search-btn"><i class="ri-search-line"></i>
									</a>
								</form>
							</div>
						</div>
					</div>
					<div class="right-header">
						<div class="cr-right-tool cr-flag-drop language">
							<div class="cr-hover-drop">
								<div class="cr-hover-tool">
									<img class="flag" src="/src/assets/user/img/flag/us.png" alt="flag">
								</div>
								<div class="cr-hover-drop-panel right">
									<ul>
										<li><a href="javascript:void(0)"><img class="flag" src="/src/assets/user/img/flag/us.png"
													alt="flag">English</a></li>
										<li><a href="javascript:void(0)"><img class="flag" src="/src/assets/user/img/flag/in.png"
													alt="flag">Hindi</a></li>
										<li><a href="javascript:void(0)"><img class="flag" src="/src/assets/user/img/flag/de.png"
													alt="flag"> Deutsch</a></li>
										<li><a href="javascript:void(0)"><img class="flag" src="/src/assets/user/img/flag/it.png"
													alt="flag">Italian</a></li>
										<li><a href="javascript:void(0)"><img class="flag" src="/src/assets/user/img/flag/jp.png"
													alt="flag">Japanese</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="cr-right-tool apps">
							<div class="cr-hover-drop">
								<div class="cr-hover-tool">
									<i class="ri-apps-2-line"></i>
								</div>
								<div class="cr-hover-drop-panel right">
									<h6 class="title">Apps</h6>
									<ul>
										<li><a href="javascript:void(0)"><img class="app" :src="app1"
													alt="flag">English</a></li>
										<li><a href="javascript:void(0)"><img class="app" :src="app2"
													alt="flag">Hindi</a></li>
										<li><a href="javascript:void(0)"><img class="app" :src="app3"
													alt="flag"> Deutsch</a></li>
										<li><a href="javascript:void(0)"><img class="app" :src="app4"
													alt="flag">Italian</a></li>
										<li><a href="javascript:void(0)"><img class="app" :src="app5"
													alt="flag">Japanese</a></li>
										<li><a href="javascript:void(0)"><img class="app" :src="app6"
													alt="flag">Japanese</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="cr-right-tool display-screen">
							<a class="cr-screen full" href="javascript:void(0)"><i
									class="ri-fullscreen-line"></i></a>
							<a class="cr-screen reset" href="javascript:void(0)"><i
									class="ri-fullscreen-exit-line"></i></a>
						</div>
						<div class="cr-right-tool">
							<a class="cr-notify" href="javascript:void(0)">
								<i class="ri-notification-2-line"></i>
								<span class="label"></span>
							</a>
						</div>
						<div class="cr-right-tool display-dark">
							<a class="cr-mode dark" href="javascript:void(0)"><i class="ri-moon-clear-line"></i></a>
							<a class="cr-mode light" href="javascript:void(0)"><i class="ri-sun-line"></i></a>
						</div>
						<div class="cr-right-tool cr-user-drop">
							<div class="cr-hover-drop">
								<div class="cr-hover-tool">
									<img class="user" :src="userImg" alt="user">
								</div>
								<div class="cr-hover-drop-panel right">
									<div class="details">
										<h6>Wiley Waites</h6>
										<p>wiley@example.com</p>
									</div>
									<ul class="border-top">
										<li><a href="team-profile.html">Profile</a></li>
										<li><a href="faq.html">Help</a></li>
										<li><a href="chatapp.html">Messages</a></li>
										<li><a href="project-overview.html">Projects</a></li>
										<li><a href="team-update.html">Settings</a></li>
									</ul>
									<ul class="border-top">
										<li><a href="signin.html"><i class="ri-logout-circle-r-line"></i>Logout</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
</template>

<script setup>
import flagUs from '@/assets/user/img/flag/us.png';
import flagIn from '@/assets/user/img/flag/in.png';
import flagDe from '@/assets/user/img/flag/de.png';
import flagIt from '@/assets/user/img/flag/it.png';
import flagJp from '@/assets/user/img/flag/jp.png';
import app1 from '@/assets/user/img/apps/1.png';
import app2 from '@/assets/user/img/apps/2.png';
import app3 from '@/assets/user/img/apps/3.png';
import app4 from '@/assets/user/img/apps/4.png';
import app5 from '@/assets/user/img/apps/5.png';
import app6 from '@/assets/user/img/apps/6.png';
import userImg from '@/assets/user/img/user/1.jpg';
</script>

<style scoped>

</style>
