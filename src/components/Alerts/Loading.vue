<template>
    <div class="fixed top-0 left-0 flex flex-col min-h-screen w-full bg-white justify-center items-center z-50 opacity-80">
        <div><p class="loader"></p></div>
        <div class="mt-4">
            <p class="2xl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-sm xs:text-sm 2xs:text-xs">
               Processing, Please Wait . . .
            </p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid black;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
</style>