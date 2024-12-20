<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary mb-3">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/about"
              >About</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>
