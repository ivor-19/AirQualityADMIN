<template>
    <div class="fixed top-0 left-0 flex flex-col min-h-screen w-full bg-[#00000050] justify-center items-center z-50 ">
        <div><p class="loader"></p></div>
        <div class="mt-4">
            <p class="2xl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-sm xs:text-sm 2xs:text-xs text-white">
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
        border: 5px solid white;
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