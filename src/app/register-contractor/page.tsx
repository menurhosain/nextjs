import RegisterContractorForm from "./register-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function RegisterContractorPage() {
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
      <div className="py-[150px] register-box flex items-center justify-center bg-gray-50 py-40 px-4">
        <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create a subcontractor account
          </h2>
          <RegisterContractorForm />
        </div>
      </div>
    </>
  );
}
