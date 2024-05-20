import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, IconButton, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaLeaf, FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [areas, setAreas] = useState([]);
  const [newAreaName, setNewAreaName] = useState("");
  const [newPlantName, setNewPlantName] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);

  const addArea = () => {
    if (newAreaName.trim() !== "") {
      setAreas([...areas, { name: newAreaName, plants: [] }]);
      setNewAreaName("");
    }
  };

  const addPlant = () => {
    if (selectedArea !== null && newPlantName.trim() !== "") {
      const updatedAreas = areas.map((area, index) => {
        if (index === selectedArea) {
          return { ...area, plants: [...area.plants, newPlantName] };
        }
        return area;
      });
      setAreas(updatedAreas);
      setNewPlantName("");
    }
  };

  const deleteArea = (index) => {
    setAreas(areas.filter((_, i) => i !== index));
    if (selectedArea === index) {
      setSelectedArea(null);
    }
  };

  const deletePlant = (areaIndex, plantIndex) => {
    const updatedAreas = areas.map((area, index) => {
      if (index === areaIndex) {
        return { ...area, plants: area.plants.filter((_, i) => i !== plantIndex) };
      }
      return area;
    });
    setAreas(updatedAreas);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Garden Management</Text>
        <HStack width="100%">
          <Input placeholder="New Area Name" value={newAreaName} onChange={(e) => setNewAreaName(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="green" onClick={addArea}>
            Add Area
          </Button>
        </HStack>
        <HStack width="100%">
          <Input placeholder="New Plant Name" value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)} isDisabled={selectedArea === null} />
          <Button leftIcon={<FaPlus />} colorScheme="green" onClick={addPlant} isDisabled={selectedArea === null}>
            Add Plant
          </Button>
        </HStack>
        <List spacing={3} width="100%">
          {areas.map((area, areaIndex) => (
            <Box key={areaIndex} borderWidth="1px" borderRadius="lg" p={4} width="100%">
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  {area.name}
                </Text>
                <IconButton aria-label="Delete Area" icon={<FaTrash />} colorScheme="red" onClick={() => deleteArea(areaIndex)} />
              </HStack>
              <Button mt={2} size="sm" colorScheme="blue" onClick={() => setSelectedArea(areaIndex)}>
                Select Area
              </Button>
              <List spacing={2} mt={4}>
                {area.plants.map((plant, plantIndex) => (
                  <ListItem key={plantIndex}>
                    <HStack justifyContent="space-between">
                      <HStack>
                        <ListIcon as={FaLeaf} color="green.500" />
                        <Text>{plant}</Text>
                      </HStack>
                      <IconButton aria-label="Delete Plant" icon={<FaTrash />} colorScheme="red" size="sm" onClick={() => deletePlant(areaIndex, plantIndex)} />
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
