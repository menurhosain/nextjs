import RegisterApplicantForm from "./register-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function RegisterApplicantPage() {
  return (
    <>
      <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
        <Left class_name="max-[640px]:pt-[70px]">
          <div className="flex flex-col justify-center">
            <Banner_Title
              subtitle="Building Trust And Excellence"
              title={<>
                Building Trust Through <br /> Quality Construction <br /> Trust Through
              </>}
            />
          </div>
        </Left>

        <Right>
          <div></div>
        </Right>
      </Banner>
      <div className="py-[80px] lg:py-[150px] register-box flex items-center justify-center bg-gray-50 py-40 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-5 sm:p-8">
          <h1 className="text-[24px] sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Create an Applicant account
          </h1>
          <RegisterApplicantForm />
        </div>
      </div>
    </>
  );
}
