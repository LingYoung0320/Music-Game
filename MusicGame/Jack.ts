class User{
    name = "";
  }
  
  let user1 = new User();
  user1.name = "John";
  let user2 = new User();
  user2.name = "Jane";
  
  function test(user1:User){
    user1.name = "Jack";
    user1=user2;
    console.log(user1.name);
    user2=user1;
    user1.name = "Jill";
  }
  
  test(user1);
  console.log(user1.name);
  console.log(user2.name);