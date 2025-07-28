// import { LoginForm } from "@/components/login-form";
// // import CoverImage from "@/assets/image/Cover.jpg";
// import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid"


// export default function Page() {
//   return (
//     <div
//       className="flex items-center justify-center p-6 md:p-10 "
      
//     >


//     <div style={{ width: '100%', height: '600px', }}>
//       <DotGrid
//         dotSize={10}
//         gap={15}
//         baseColor="#5227FF"
//         activeColor="#5227FF"
//         proximity={120}
//         shockRadius={250}
//         shockStrength={5}
//         resistance={750}
//         returnDuration={1.5}
//       />


//         <div className=" absolute w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <LoginForm />
//         </div>
      
//     </div>
//     </div>
//   );
// }



import { LoginForm } from "@/components/login-form";
import DotGrid from "@/blocks/Backgrounds/DotGrid/DotGrid";

export default function Page() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#785E77"
          proximity={210}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Glassy Card with Login Form */}
      <div className="relative z-10 w-full max-w-sm rounded-xl bg-white/8 p-6 backdrop-blur-md shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}
