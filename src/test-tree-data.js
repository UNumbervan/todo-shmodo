import faker from 'Faker';

export default generateTree();

function generateTree(){

}

function generateNode() {
    return {
        text: faker.random.word
    };
}
