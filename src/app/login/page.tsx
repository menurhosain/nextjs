import LoginForm from "./login-form";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export default function LoginPage() {
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
    <div className="py-[80px] lg:py-[150px] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h1>
        <LoginForm />
      </div>
    </div>
    </>
  );
}
