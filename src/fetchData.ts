interface Pet {
  id: number;
  name: string;
  status: "available" | "pending" | "sold";
  category?: {
    id: number;
    name: string;
  };
  photoUrls: string[];
  tags?: {
    id: number;
    name: string;
  }[];
}

async function fetchPetsByStatus(
  status: "available" | "pending" | "sold"
): Promise<Pet[]> {
  const url = `https://petstore3.swagger.io/api/v3/pet/findByStatus?status=${status}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: Pet[] = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return [];
  }
}

fetchPetsByStatus("available").then((pets) => {
  console.log("Полученные питомцы:", pets);
});
