"use client";


import { ScrollReveal } from "@/components/ui/scroll-reveal";

const policies = [
  {
    id: 1,
    description:
      "At tempus aenean sapien torquent sed diam class efficitur mus morbi eros dictum quam augue ac laor eet ligula libero mi commodo nibh hac fermentum orci ad pharetra consequat justo pellentesque vulputate malesuada dictumst fames interdum commodo nibh hac fermentum orci efficitur mus morbi.",
    link: "#",
  },
];

export default function Subcontractor() {

  return (
    <section className="bg-sah-light-4 bg-[url('/careers-bg-pattern.png')] bg-bottom bg-no-repeat">
      <div className="container !max-w-[1720px] !px-[50px] pt-[50px] lg:pt-[140px] pb-[50px] lg:pb-[150px] border-x border-sah-light-3">
        {/* ── Hero / Intro ── */}
        <div className="pb-[20px] flex gap-12 items-start justify-between flex-wrap">
          <div className="w-[47%]">
            <ScrollReveal toColor="var(--color-sah-dark-2)">
              <h2 className="section-heading mx-auto text-left leading-[48px] mb-[30px]">
                <span className="text-sah-dark-2">
                  Working with industry leading partners to ensure excellence in {" "}
                </span>
                <span className="text-sah-dark-2/50 scroll-color font-bold">every construction project we deliver</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="w-[530px]">
            <p className="text-[16px] text-sah-gray-1 leading-relaxed">
              Saif Salim Essa Al Harasi & Co. LLC. (SAH) is a renowned construction company based
              in the Sultanate of Oman. With a rich legacy spanning several decades, SAH has
              established itself as a trusted name in the construction industry, delivering
              exceptional projects of the highest quality.
            </p>
          </div>
        </div>

        {/* ── Hero Image + Helpful Links Banner ── */}
        <div className="relative w-full">
          <div className="relative rounded-xl overflow-hidden">
            {/* Team photo placeholder */}
            <div className="w-full h-[560px] md:h-[560px] bg-[url('/subcontractor-img-1.jpg')] bg-cover bg-center bg-no-repeat flex items-end relative">
              {/* Decorative overlay text */}
              <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(35,37,40,0)_28.83%,_#232528_100%)]"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-14 pointer-events-none select-none gap-[40px]">
                <span className="text-[60px] md:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Helpful
                </span>
                <span className="text-[60px] md:text-[100px] font-black text-white/10  uppercase [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:text-white/25]">
                  Links
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex gap-5 justify-center mt-[-65px]">
          <a
            href="register"
            className="px-4 h-[130px] w-[168px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium  tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className=""><g><path d="M11.894 24a.5.5 0 0 1-.491-.597l.707-3.535a.49.49 0 0 1 .137-.256l7.778-7.778a1.503 1.503 0 0 1 2.121 0l1.414 1.414a1.501 1.501 0 0 1 0 2.121l-7.778 7.778a.497.497 0 0 1-.256.137l-3.535.707a.53.53 0 0 1-.097.009zm1.168-3.789-.53 2.651 2.651-.53 7.671-7.671a.5.5 0 0 0 0-.707L21.44 12.54a.5.5 0 0 0-.707 0zm2.367 2.582h.01zM9.5 21h-7A2.502 2.502 0 0 1 0 18.5v-13C0 4.121 1.121 3 2.5 3h2a.5.5 0 0 1 0 1h-2C1.673 4 1 4.673 1 5.5v13c0 .827.673 1.5 1.5 1.5h7a.5.5 0 0 1 0 1zM16.5 12a.5.5 0 0 1-.5-.5v-6c0-.827-.673-1.5-1.5-1.5h-2a.5.5 0 0 1 0-1h2C15.879 3 17 4.121 17 5.5v6a.5.5 0 0 1-.5.5z" opacity="1" data-original="#000000" className=""></path><path d="M11.5 6h-6C4.673 6 4 5.327 4 4.5v-2a.5.5 0 0 1 .5-.5h1.55C6.282.86 7.293 0 8.5 0s2.218.86 2.45 2h1.55a.5.5 0 0 1 .5.5v2c0 .827-.673 1.5-1.5 1.5zM5 3v1.5c0 .275.225.5.5.5h6c.275 0 .5-.225.5-.5V3h-1.5a.5.5 0 0 1-.5-.5C10 1.673 9.327 1 8.5 1S7 1.673 7 2.5a.5.5 0 0 1-.5.5zM13.5 9h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1zM13.5 12h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1zM13.5 15h-10a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1z" opacity="1" data-original="#000000" className=""></path></g></svg>
            </div>
            New User Registration
          </a>
          <a
            href="login"
            className="px-4 h-[130px] w-[150px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white "
          >
            <div className="text-[35px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className=""><g><path d="M12.725 18.301h4.32a7.634 7.634 0 0 1 6.499 3.579.9.9 0 0 0 1.523-.959 9.396 9.396 0 0 0-5.438-4.057 8.598 8.598 0 0 0 3.855-7.165c0-4.741-3.857-8.599-8.599-8.599S6.287 4.957 6.287 9.698a8.594 8.594 0 0 0 3.857 7.167c-3.992 1.129-6.929 4.797-6.929 9.144v1.23c0 1.354.956 2.516 2.268 2.764a49.34 49.34 0 0 0 9.402.896h.45a.9.9 0 0 0 0-1.8h-.45c-3.066 0-6.113-.29-9.063-.864a1.005 1.005 0 0 1-.807-.995v-1.23c0-4.251 3.459-7.709 7.71-7.709zM8.086 9.698A6.806 6.806 0 0 1 14.884 2.9c3.749 0 6.799 3.049 6.799 6.798s-3.05 6.799-6.799 6.799a6.806 6.806 0 0 1-6.798-6.799z" opacity="1" data-original="#000000"></path><path d="m28.521 27.151-2.212-2.212a.9.9 0 0 0-1.272 1.273l.675.675h-6.577a.9.9 0 0 0 0 1.8h6.577l-.675.675a.9.9 0 1 0 1.272 1.273l2.212-2.212a.898.898 0 0 0 0-1.272z" opacity="1" data-original="#000000"></path></g></svg>
            </div>
            Returning Users
          </a>
          <a
            href="#"
            className="px-4 h-[130px] w-[230px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=""><g><path d="M17.5 24c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-12c-3.033 0-5.5 2.467-5.5 5.5s2.467 5.5 5.5 5.5 5.5-2.467 5.5-5.5-2.467-5.5-5.5-5.5z" opacity="1" data-original="#000000" className=""></path><path d="M17.5 21a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5z" opacity="1" data-original="#000000" className=""></path><circle cx="17.5" cy="14.5" r=".5" opacity="1" data-original="#000000" className=""></circle><path d="M8.839 15.55a.517.517 0 0 1-.221-.051 7.033 7.033 0 0 0-3.934-.682 1.52 1.52 0 0 1-1.189-.373A1.48 1.48 0 0 1 3 13.34V1.59C3 .842 3.559.199 4.3.095 6.688-.258 8.942.406 11 2.077 13.058.407 15.309-.26 17.703.096A1.515 1.515 0 0 1 19 1.59V8.5a.5.5 0 0 1-1 0V1.59a.513.513 0 0 0-.44-.505c-2.252-.335-4.29.328-6.231 2.022a.5.5 0 0 1-.657 0C8.729 1.412 6.693.75 4.443 1.084A.514.514 0 0 0 4 1.59v11.75a.47.47 0 0 0 .16.357c.11.098.257.144.412.126a8.003 8.003 0 0 1 4.489.778.501.501 0 0 1-.222.949z" opacity="1" data-original="#000000" className=""></path><path d="M21.5 10a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2c.827 0 1.5.673 1.5 1.5v6a.5.5 0 0 1-.5.5zM8.5 17h-7C.673 17 0 16.327 0 15.5v-12C0 2.688.669 2.015 1.491 2H3.5a.5.5 0 0 1 0 1h-2a.51.51 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h7a.5.5 0 0 1 0 1zM11 12a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 1 0v9a.5.5 0 0 1-.5.5z" opacity="1" data-original="#000000" className=""></path></g></svg>
            </div>
            Subcontractor Quick Start Guide
          </a>
          <a
            href="#"
            className="px-4 h-[130px] w-[230px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=""><g><path d="M75.25 348.744a11.069 11.069 0 0 0-15.35 13.885l15.634 43.078L59.9 448.785A11.084 11.084 0 0 0 70.187 463.9a11.137 11.137 0 0 0 5.078-1.233l91.808-47.149a11.066 11.066 0 0 0-.07-19.65l-91.738-47.116zm22.117 52.941L89.8 380.829l48.444 24.878L89.8 430.585l7.574-20.87a10.994 10.994 0 0 0-.007-8.03z" opacity="1" data-original="#000000"></path><path d="M105.076 300.631a105.076 105.076 0 1 0 105.075 105.076 105.2 105.2 0 0 0-105.075-105.076zm0 188.256a83.181 83.181 0 1 1 83.18-83.18 83.275 83.275 0 0 1-83.18 83.18zM501.88 44.873l-.042-.079C487.685 18.387 459.62 1.691 428.6 1.219h-.333c-31.025.472-59.091 17.168-73.286 43.654-34.624 65.881 28 131.7 61.651 167.065l.251.255c3.526 3.472 7.384 5.23 11.473 5.23h.155c4.088 0 7.946-1.758 11.472-5.23l.25-.255c33.642-35.362 96.267-101.184 61.647-167.065zm-73.452 147.682c-39.958-42.457-78.453-91.1-54.112-137.418 10.374-19.357 31.1-31.615 54.112-32.023 23 .407 43.711 12.651 54.092 31.987 24.334 46.378-14.147 95.011-54.092 137.454z" opacity="1" data-original="#000000"></path><path d="M428.428 38.574a47.062 47.062 0 1 0 47.062 47.062 47.115 47.115 0 0 0-47.062-47.062zm0 72.228a25.167 25.167 0 1 1 25.166-25.166 25.195 25.195 0 0 1-25.166 25.164zM350.325 244.58H161.35a59.436 59.436 0 0 1-59.369-59.368v-2.69a59.437 59.437 0 0 1 59.369-59.37h17.478a10.948 10.948 0 1 0 0-21.895H161.35a81.356 81.356 0 0 0-81.264 81.265v2.69a81.356 81.356 0 0 0 81.264 81.264h188.975a59.369 59.369 0 1 1 0 118.738H249.837a10.948 10.948 0 1 0 0 21.895h100.488a81.265 81.265 0 0 0 0-162.529zM218.833 123h33a10.948 10.948 0 0 0 0-21.9h-33a10.948 10.948 0 0 0 0 21.9zM290.841 123h33a10.948 10.948 0 1 0 0-21.9h-33a10.948 10.948 0 1 0 0 21.9z" opacity="1" data-original="#000000"></path></g></svg>
            </div>
            Subcontractor Navigation Guide
          </a>
          <a
            href="contact"
            className="px-4 h-[130px]  w-[160px] text-center flex flex-col gap-[8px] items-center justify-center rounded-[10px] text-[18px] font-medium tracking-wide rounded transition-all duration-200 bg-sah-white hover:bg-sah-red hover:text-sah-white"
          >
            <div className="text-[35px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className=""><g><path d="M55.514 42.325h-5.24l4.029-11.586a1 1 0 0 0-.944-1.328H43.294a7.237 7.237 0 0 0-6.354-3.777h-2.524v-1.952a6.314 6.314 0 0 0 2.048-2.815h1.603c1.599 0 2.9-1.301 2.9-2.9v-1.66a2.898 2.898 0 0 0-1.84-2.693V9.961c0-4.389-3.57-7.959-7.959-7.959h-1.265c-4.389 0-7.959 3.57-7.959 7.959v3.653a2.9 2.9 0 0 0-1.84 2.693v1.66c0 1.6 1.301 2.9 2.9 2.9h1.601a6.28 6.28 0 0 0 2.055 2.822v1.945h-2.522c-4.01 0-7.273 3.256-7.273 7.259v9.433H8.486a1 1 0 0 0-1 1v4.923a1 1 0 0 0 1 1h.947v12.333a1 1 0 0 0 1 1h43.134a1 1 0 0 0 1-1V49.249h.947a1 1 0 0 0 1-1v-4.923a1 1 0 0 0-1-1zm-7.357 0h-14.75l3.795-10.914h14.75zM32.414 26.626a2.355 2.355 0 0 1-.145.77c-.2.52-.664 1.072-1.734 1.072-1.711 0-1.868-1.412-1.875-1.837v-1.88c.013.004.027.005.041.009.244.074.495.126.749.17.049.008.095.024.144.031.31.046.624.072.942.072s.633-.026.944-.073c.055-.008.108-.026.163-.036.245-.044.488-.093.726-.165.016-.005.033-.006.049-.011v1.867l-.002.011zm2.29-12.963c-.069-.038-.137-.075-.207-.12-.093-.06-.187-.135-.281-.21-.066-.052-.132-.1-.198-.16a3.58 3.58 0 0 1-.301-.33c-.052-.062-.107-.113-.157-.181a3.918 3.918 0 0 1-.4-.675 1 1 0 0 0-.793-.568 1.003 1.003 0 0 0-.906.377c-.007.008-.038.045-.076.086l-.02.022c-.047.05-.117.118-.199.194l-.042.039c-.089.08-.202.171-.33.267l-.07.052a6.468 6.468 0 0 1-.472.311l-.094.055a7.524 7.524 0 0 1-.633.327l-.105.046a8.82 8.82 0 0 1-.822.316c-.026.009-.055.016-.082.025-.644.205-1.408.372-2.305.464l-.072.008a1.005 1.005 0 0 0-.189-.278c-.023-.025-.049-.044-.074-.066a1.013 1.013 0 0 0-.211-.142c-.031-.016-.06-.032-.093-.044a.977.977 0 0 0-.351-.071H24.7l-.042-.817a5.049 5.049 0 0 1 1.393-3.775 5.049 5.049 0 0 1 3.694-1.589h1.581c1.41 0 2.723.564 3.695 1.59.972 1.024 1.467 2.365 1.393 3.774s-.042.817-.042.817h-.522a.976.976 0 0 0-.35.071c-.022.008-.043.015-.064.025a1.007 1.007 0 0 0-.275.185c-.015.014-.027.03-.041.045-.029.031-.06.06-.085.095-.025-.011-.049-.019-.075-.031a3.693 3.693 0 0 1-.256-.132zm4.263 4.303c0 .496-.404.9-.9.9h-1.219v-3.461h1.219c.496 0 .9.404.9.9v1.66zM29.902 4h1.265a5.968 5.968 0 0 1 5.498 3.663c-.065-.075-.125-.153-.194-.226a7.03 7.03 0 0 0-5.146-2.213h-1.581a7.03 7.03 0 0 0-5.146 2.213c-.069.073-.128.151-.194.226A5.968 5.968 0 0 1 29.902 4zm-5.681 14.866h-1.218a.901.901 0 0 1-.9-.9v-1.66c0-.496.404-.9.9-.9h1.218v3.461zm2-.28c0-.011.006-.02.006-.031v-2.548c.051-.005.095-.013.146-.018.161-.016.312-.038.467-.059a11.187 11.187 0 0 0 1.065-.182 12.3 12.3 0 0 0 .945-.237c.164-.048.321-.098.474-.151a10.593 10.593 0 0 0 .78-.299c.105-.045.211-.089.31-.136.133-.062.255-.125.377-.189.086-.045.175-.089.256-.134.127-.071.24-.141.354-.212.06-.038.127-.075.183-.112.163-.107.313-.212.448-.313.17.22.35.41.533.586.032.031.063.062.095.091.177.162.358.307.539.434l.097.066c.38.255.756.441 1.1.575l.071.028c.131.049.257.092.376.128v2.682c0 .01.006.019.006.029v.143a4.31 4.31 0 0 1-1.979 3.617c-.153.1-.314.184-.478.261-1.283.606-2.854.538-4.064-.189-.04-.024-.084-.042-.124-.068a4.302 4.302 0 0 1-1.982-3.621v-.14zm-7.357 14.306c0-2.899 2.365-5.259 5.273-5.259h2.652c.016.06.041.12.06.181.013.044.028.086.043.13.058.169.129.335.211.5.018.036.033.072.052.108.212.394.498.763.868 1.072.042.035.089.064.133.098a3.343 3.343 0 0 0 .684.401c.173.077.36.138.557.19.076.02.147.044.226.06.282.057.581.095.91.095s.628-.038.91-.095c.08-.016.151-.04.227-.06a3.753 3.753 0 0 0 .768-.291 3.46 3.46 0 0 0 .465-.294c.048-.036.099-.068.144-.106.364-.305.647-.667.857-1.054.029-.054.053-.109.08-.164a4.224 4.224 0 0 0 .247-.629c.014-.047.035-.095.047-.142h2.66c1.54 0 2.967.666 3.948 1.777h-4.397a.999.999 0 0 0-.944.672l-4.258 12.242H18.862v-9.433zM9.486 44.325h45.028v2.923H9.486zm43.081 16.256H11.433V49.248h41.134z" opacity="1" data-original="#000000" className=""></path><path d="M39.695 36.923c0 1.999 1.626 3.626 3.626 3.626s3.626-1.627 3.626-3.626-1.627-3.627-3.626-3.627-3.626 1.627-3.626 3.627zm3.626-1.627a1.628 1.628 0 0 1 0 3.253 1.627 1.627 0 0 1 0-3.253z" opacity="1" data-original="#000000" className=""></path></g></svg>
            </div>
            Email Help Desk
          </a>
        </div>
        {/* ── Important Policies ── */}
        <div className="pt-[135px]">
          <div className="text-center mb-10">
            <h2 className="text-[40px] md:text-[40px] font-bold text-sah-dark-2 mb-4">Important Policies</h2>
            <p className="text-[16px] text-sah-gray-1 max-w-[730px] mx-auto leading-relaxed">
              Please take a moment to review these two important policies carefully. They outline the
              key guidelines, responsibilities, and expected conduct required for all our projects to
              ensure smooth collaboration and successful project delivery.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="flex flex-col md:flex-row gap-4"
              >
                {/* Left image block */}
                <div className="md:w-140 w-full h-48 md:h-auto bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0 relative overflow-hidden rounded-[8px]">
                  <div className="absolute inset-0 bg-[url('/subcontractor-img-2.jpg')] bg-cover bg-center bg-no-repeat" />

                </div>

                {/* Content */}
                <div className="flex-1 p-10 flex flex-col justify-between bg-white rounded-[8px]">
                  <div>
                    <p className="text-[20px] text-sah-dark-2 leading-[36px]">{policy.description}</p>
                  </div>
                  <div className="w-full h-[1px] bg-sah-light-3 mt-[40px]" />
                  <div className="flex flex-wrap gap-[47px] mt-[50px]">
                    <a
                    href="#"
                      className={`group flex items-center gap-2 text-[16px] font-medium bg-sah-light-4 text-sah-dark-2 pl-[30px] pr-[10px] py-2 rounded-full transition-all duration-300 hover:bg-sah-red hover:text-white scale-105`}
                    >
                      CODE OF CONDUCT
                      <span
                        className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 bg-sah-red text-sah-white group-hover:bg-sah-white group-hover:text-sah-dark-2`}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" className="!w-[9px] h-[9px]">
                          <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z" />
                        </svg>
                      </span>
                    </a>
                    <a
                    href="#"
                      className={`group flex items-center gap-2 text-[16px] font-medium bg-sah-light-4 text-sah-dark-2 pl-[30px] pr-[10px] py-2 rounded-full transition-all duration-300 hover:bg-sah-red hover:text-white scale-105`}
                    >
                      BIAS AND HARASSMENT POLICY
                      <span
                        className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-all duration-300 bg-sah-dark-2 text-sah-white group-hover:bg-sah-white group-hover:text-sah-dark-2`}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" className="!w-[9px] h-[9px]">
                          <path d="M8.35083 2.845L1.17833 10.0175L0 8.83917L7.17167 1.66667H0.850834V0H10.0175V9.16667H8.35083V2.845Z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable Buttons ── */

