<script setup>
const newData = {
  id: "1",
  image: "/src/assets/images/placeholder.jpg",
  date: new Date(),
  title: "New title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat eros vel velit semper, quis interdum enim malesuada. Nulla auctor augue ut augue scelerisque commodo eget at magna. Proin suscipit tincidunt dolor nec vehicula. Proin aliquam maximus ex sed pulvinar. Integer at accumsan nisl. Sed placerat sem vitae pretium posuere. Praesent ultricies vel velit quis convallis. Phasellus arcu augue, varius a ligula vitae, fermentum euismod justo.\n" +
    "\n" +
    "Donec posuere erat ac odio pretium ullamcorper. Donec iaculis elementum elit, sit amet vulputate mi fringilla at. Suspendisse convallis nibh eget felis finibus mattis. Morbi sollicitudin volutpat ante ac dapibus. Suspendisse efficitur, augue quis maximus blandit, nisl justo luctus nunc, vel imperdiet orci nisl eget purus. Ut luctus maximus nisl eu tempus. Praesent molestie lectus id turpis faucibus maximus. Suspendisse et accumsan erat. Etiam nec neque a neque euismod faucibus in a nunc. Etiam aliquam nunc id sapien congue vulputate sed eu libero. Fusce vulputate a lectus sit amet molestie. Praesent ut interdum elit, a scelerisque ex.\n" +
    "\n" +
    "Nulla vitae vehicula lectus. In eu tortor non felis ultrices consequat vel eget lacus. Nullam ullamcorper, odio ut malesuada varius, lectus mi maximus leo, at ultricies ex mi ac erat. Cras faucibus diam id est lacinia blandit. Vestibulum sagittis, lacus in faucibus ultricies, leo ante lobortis est, ut elementum risus sapien vel dolor. Sed fermentum velit nec lectus congue, vitae posuere eros fringilla. Maecenas ut finibus sapien, et viverra est. Sed mattis luctus diam, eu congue arcu sagittis vel.\n" +
    "\n" +
    "Etiam pulvinar ante at est suscipit molestie. Suspendisse velit augue, lacinia vestibulum fermentum eu, sagittis at diam. Mauris lectus lorem, elementum eu sem ut, dignissim vestibulum nisl. Nulla eget felis et erat malesuada feugiat. Morbi feugiat massa sapien, in feugiat ex tincidunt non. Praesent nulla lacus, iaculis eu varius ut, pretium eu orci. Nunc vel leo ipsum. Duis rutrum urna at orci malesuada lacinia. Nulla eleifend aliquet varius. Pellentesque quis tincidunt metus. Nulla venenatis nulla enim, in porta nibh tempor in. Etiam tristique, lacus vel rutrum porttitor, sem libero posuere risus, vel feugiat risus dui interdum urna. Donec vestibulum, ligula sit amet consectetur fringilla, libero erat imperdiet est, eu cursus magna neque eu magna. Sed gravida nisl sed enim laoreet, ut ornare nunc venenatis. Nunc a rutrum augue, ac lobortis nibh. Quisque turpis dolor, commodo eget nulla vitae, porta ornare risus.\n" +
    "\n" +
    "Praesent suscipit enim vitae nisi elementum, sed porttitor diam cursus. Duis porta lobortis risus id pellentesque. Curabitur convallis malesuada euismod. Aliquam quis faucibus nisi, nec blandit mi. Fusce varius nisl tincidunt vestibulum finibus. Mauris gravida libero nec est luctus, et commodo nibh faucibus. Duis porttitor lectus elementum ipsum auctor, sit amet vehicula sapien tempus. Morbi eleifend rhoncus justo, eu vestibulum urna tempus eu. Maecenas imperdiet neque eu nulla pharetra pharetra. Curabitur in maximus arcu. Nulla in viverra metus. Vestibulum vel sem diam. Proin fringilla tortor sit amet lectus ultrices, sed porta justo feugiat. Pellentesque orci elit, pellentesque id iaculis at, volutpat id mi.",
}
</script>

<template>
<div class="view-content">
  <h1 class="news-title">{{ newData.title }}</h1>
  <p class="news-date">{{ newData.date }}</p>
  <img class="news-image" :src="newData.image" />
  <pre class="news-data"> {{ newData.description }} </pre>
</div>
</template>

<style scoped>

.view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  padding: 0 24px;
  max-width: 800px;
  width: 100%;
}

.news-title {
  margin: 0;
}

.news-image {
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.news-date {
  font-size: 15px;
  color: gray;
}

.news-data {
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>