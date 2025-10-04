// "use server";

// import { getUserSession } from "@/helpers/getUerSession";
// import { revalidatePath, revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";


// export const createResume = async (data: FormData) => {
//   const session = await getUserSession()
//   const emailFromsession = session?.user?.email
//   const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${emailFromsession}`)
//   const { data: user } = await resultData.json()


//   const formObj = Object.fromEntries(data.entries());

//   // Build structured JSON
//   const modifiedData = {
//     userId: user?.id,
//     contactInfo: {
//       fullName: formObj["contactInfo[fullName]"] || "",
//       email: formObj["contactInfo[email]"] || "",
//       phone: formObj["contactInfo[phone]"] || "",
//       address: formObj["contactInfo[address]"] || "",
//       linkedin: formObj["contactInfo[linkedin]"] || "",
//       github: formObj["contactInfo[github]"] || "",
//     },

//     workExperience: [
//       {
//         company: formObj["workExperience[0][company]"] || "",
//         position: formObj["workExperience[0][position]"] || "",
//         startDate: formObj["workExperience[0][startDate]"] || "",
//         endDate: formObj["workExperience[0][endDate]"] || "",
//         responsibilities: formObj["workExperience[0][responsibilities]"]
//           ? formObj["workExperience[0][responsibilities]"].split(",").map(r => r.trim())
//           : [],
//       },
//       {
//         company: formObj["workExperience[1][company]"] || "",
//         position: formObj["workExperience[1][position]"] || "",
//         startDate: formObj["workExperience[1][startDate]"] || "",
//         endDate: formObj["workExperience[1][endDate]"] || "",
//         responsibilities: formObj["workExperience[1][responsibilities]"]
//           ? formObj["workExperience[1][responsibilities]"].split(",").map(r => r.trim())
//           : [],
//       },
//     ],

//     education: [
//       {
//         institution: formObj["education[0][institution]"] || "",
//         degree: formObj["education[0][degree]"] || "",
//         startDate: formObj["education[0][startDate]"] || "",
//         endDate: formObj["education[0][endDate]"] || "",
//         details: formObj["education[0][details]"] || "",
//       },
//     ],

    
//     skills: formObj["skills"]
//       ? formObj["skills"].split(",").map((s) => s.trim())
//       : [],



//     certifications: [
//       {
//         name: formObj["certifications[0][name]"] || "",
//         issuer: formObj["certifications[0][issuer]"] || "",
//         date: formObj["certifications[0][date]"] || "",
//       },
//       {
//         name: formObj["certifications[1][name]"] || "",
//         issuer: formObj["certifications[1][issuer]"] || "",
//         date: formObj["certifications[1][date]"] || "",
//       },
//     ],
//   };


//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/resume`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(modifiedData),
//   });

//   const result = await res.json();


//   if (result?.data?.id) {
//     revalidateTag("BLOGS");
//     revalidatePath("/blogs");
//     redirect("/resume");
//   }

//   return result;
// };
// change above code
"use server";

import { getUserSession } from "@/helpers/getUerSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createResume = async (data: FormData) => {
  const session = await getUserSession();
  const emailFromSession = session?.user?.email;

  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${emailFromSession}`);
  const { data: user } = await resultData.json();

  const formObj = Object.fromEntries(data.entries());

  // Helper function to safely split strings from FormData
  const splitString = (value: FormDataEntryValue | undefined) =>
    typeof value === "string" && value.length > 0
      ? value.split(",").map((s) => s.trim())
      : [];

  const modifiedData = {
    userId: user?.id,
    contactInfo: {
      fullName: (formObj["contactInfo[fullName]"] as string) || "",
      email: (formObj["contactInfo[email]"] as string) || "",
      phone: (formObj["contactInfo[phone]"] as string) || "",
      address: (formObj["contactInfo[address]"] as string) || "",
      linkedin: (formObj["contactInfo[linkedin]"] as string) || "",
      github: (formObj["contactInfo[github]"] as string) || "",
    },

    workExperience: [
      {
        company: (formObj["workExperience[0][company]"] as string) || "",
        position: (formObj["workExperience[0][position]"] as string) || "",
        startDate: (formObj["workExperience[0][startDate]"] as string) || "",
        endDate: (formObj["workExperience[0][endDate]"] as string) || "",
        responsibilities: splitString(formObj["workExperience[0][responsibilities]"]),
      },
      {
        company: (formObj["workExperience[1][company]"] as string) || "",
        position: (formObj["workExperience[1][position]"] as string) || "",
        startDate: (formObj["workExperience[1][startDate]"] as string) || "",
        endDate: (formObj["workExperience[1][endDate]"] as string) || "",
        responsibilities: splitString(formObj["workExperience[1][responsibilities]"]),
      },
    ],

    education: [
      {
        institution: (formObj["education[0][institution]"] as string) || "",
        degree: (formObj["education[0][degree]"] as string) || "",
        startDate: (formObj["education[0][startDate]"] as string) || "",
        endDate: (formObj["education[0][endDate]"] as string) || "",
        details: (formObj["education[0][details]"] as string) || "",
      },
    ],

    skills: splitString(formObj["skills"]),

    certifications: [
      {
        name: (formObj["certifications[0][name]"] as string) || "",
        issuer: (formObj["certifications[0][issuer]"] as string) || "",
        date: (formObj["certifications[0][date]"] as string) || "",
      },
      {
        name: (formObj["certifications[1][name]"] as string) || "",
        issuer: (formObj["certifications[1][issuer]"] as string) || "",
        date: (formObj["certifications[1][date]"] as string) || "",
      },
    ],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.data?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    redirect("/resume");
  }

  return result;
};
